import requests
import base64
import uuid

content ="""
You are an Photo enrichment system.
Rules:
- Describe the image for semantic search in max 40 words.  
- Do not add any extra text or formatting.

Input:
{input_json}
"""
OLLAMA_URL = "http://localhost:11434/api/chat"
def describe_product_image(image_bytes):
    image_base64 = base64.b64encode(image_bytes).decode()

    payload = {
        "model": "gemma3:4b",
        "messages": [
            {
                "role": "user",
                "content": content,
                "images": [image_base64]
            }
        ],
        "stream": False
    }
    print("Sending request to Ollama...")
    response = requests.post(OLLAMA_URL, json=payload)
    result = response.json()
    result["message"]["content"] = {
        "id": str(uuid.uuid4()),
        "text": result["message"]["content"]
    }
    print("Parsed response:", result["message"]["content"])

    return result["message"]["content"]
