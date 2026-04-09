## Working of Application

1. Developed search platform using vector embeddings to replace keyword matching with natural language queries.
2. Built a scalable pipeline that separates image storage from intensive AI tasks, automating image tagging and
metadata generation using the Gemma vision model.
3. Converted image descriptions into embeddings using Mistral (via Ollama) and indexed them in Qdrant,
allowing users to find images via descriptive prompts and PostgreSQL retrieval.

## Technologies Used
1. Programming Language: Python
2. Storage: Postgresql (RDBMS), QDrant (Vector Database), MinIO(Object Storage)
3. Messaging Service: Kafka
4. LLM: Mistal for NLP, Gemma for VLM

## Web Page

<img src="https://raw.githubusercontent.com/Nikesh559/pixels/refs/heads/main/ss1.png" alt="Alt text" width="700">

<img src="https://raw.githubusercontent.com/Nikesh559/pixels/refs/heads/main/ss2.png" alt="Alt text" width="700">


## System Design
<img src="https://raw.githubusercontent.com/Nikesh559/pixels/refs/heads/main/ss3.png" alt="Alt text" width="700">

