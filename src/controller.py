from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from . import embedding
from . import taggings
from . import qdrant
from . import bucket_minio
from . import kafka_producer
import json
import uuid
from kafka import KafkaConsumer
from . import product_processor
from . import postgres_dao as dao
from . import product as p 
import threading
from typing import Optional
from pydantic import BaseModel
app = FastAPI()

app.mount("/static", StaticFiles(directory="frontend"), name="static")
OLLAMA_URL = "http://localhost:11434/api/chat"

# Serve the main HTML page
@app.get("/")
def home():
    return FileResponse("frontend/index.html")

@app.get("/search-images")
def home():
    return FileResponse("frontend/pint.html")


# API endpoint to add a new images
@app.post("/images")
async def add_product(
    file: UploadFile,
    title: str = Form(...)
):
    
    # ✅ generate unique ID
    product_id = str(uuid.uuid4())
    print(f"Generated Image ID: {product_id}")

    # convert attributes string → JSON
    product = p.Product(product_id, title, file.filename)

    # 1. Store product metadata in PostgreSQL
    print("Storing image metadata in PostgreSQL...", product)
    dao.insert_record(product)
    print("Image metadata stored successfully.")

    # 2. Upload image to MinIO
    print("Received product:", product_id)
    print("Uploading image to MinIO...")
    await bucket_minio.upload_product_image(file, "images")
    print("Image uploaded to MinIO successfully.")


    # 3. Send message to Kafka
    kafka_payload = {
        "id": str(product_id)
    }

    kafka_producer.send_product_message(kafka_payload)
    print("Message sent to Kafka successfully.")
    return {"message": "Product added successfully", "product": product}


# Define the request structure
class ChatRequest(BaseModel):
    message: str

# Define the response structure
class ChatResponse(BaseModel):
    type: str
    data: str

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    user_text = request.message.lower()
    embeddings = embedding.get_embedding(user_text)
    print("Generated embeddings for query.")
    qdrant_res = qdrant.search_similar_products(embeddings, 1)
    print("Received search results from Qdrant.", len(qdrant_res))

    imagesList =[]
    for r in qdrant_res:
        image = dao.get_product_by_id(r["id"])
        image.filename = "http://localhost:9000/products/"+image.filename
        imagesList.append(image)

    if imagesList:
        # Convert class instance to a dictionary for JSON transport
        return {
            "images": imagesList
        }
    # return chat_response

# Kafka consumer function to process messages from "products" topic 
def consume_messages():
    consumer = KafkaConsumer(
        'products',
        bootstrap_servers='localhost:9092',
        value_deserializer=lambda x: json.loads(x.decode('utf-8'))
    )

    print("Kafka consumer started...")
    for message in consumer:
        print("Received :", message.value)
        print("Processing product data...")
        product_processor.process_product_data(message.value["id"])
        print("Product data processed successfully.")


# Start consumer in background thread
@app.on_event("startup")
def start_kafka_consumer():
    thread = threading.Thread(target=consume_messages, daemon=True)
    thread.start()