## About
Pixels is a high-throughput, event-driven search platform that replaces traditional keyword matching with Natural Language Processing (NLP). By leveraging local multimodal LLMs and vector databases, it allows users to search image libraries using descriptive queries (e.g., "A sunset over a futuristic city") rather than static tags.

## System Architecture

The system is designed with a decoupled, event-driven architecture to ensure scalability and fault tolerance during compute-intensive AI tasks.

   * Ingestion: Images are uploaded and stored in MinIO (Object Storage).

  * Orchestration: An upload event is published to Kafka, which manages the processing queue.

  * Vision Intelligence: A worker node consumes the event and uses Gemma 4 (VLM) via Ollama to perform visual analysis and generate descriptive metadata.

  * Vectorization: Descriptive tags are processed by Mistral to generate high-dimensional embeddings.

* Storage: * PostgreSQL: Stores relational metadata and file references.

  * Qdrant: Indexes vector embeddings for sub-second similarity searches.

## Component,Technology
- Language,Python 3.11+
- Inference Engine,Ollama (Local)
- Vision Model,Gemma 4
- Embedding Model,Mistral
- Message Broker,Apache Kafka
- Vector DB,Qdrant
- Database,PostgreSQL
- Object Storage,MinIO
  
## Working of Application

1. Developed search platform using vector embeddings to replace keyword matching with natural language queries.
2. Built a scalable pipeline that separates image storage from intensive AI tasks, automating image tagging and
metadata generation using the Gemma vision model.
3. Converted image descriptions into embeddings using Mistral (via Ollama) and indexed them in Qdrant,
allowing users to find images via descriptive prompts and PostgreSQL retrieval.



## Web Page

<img src="https://raw.githubusercontent.com/Nikesh559/pixels/refs/heads/main/ss1.png" alt="Alt text" width="700">

<img src="https://raw.githubusercontent.com/Nikesh559/pixels/refs/heads/main/ss2.png" alt="Alt text" width="700">


## System Design
<img src="https://raw.githubusercontent.com/Nikesh559/pixels/refs/heads/main/ss3.png" alt="Alt text" width="700">

## Installation Guide

1. Prerequisites

 Ensure you have the following installed:

    Docker & Docker Compose (for infrastructure)

    Python 3.10+

    Ollama (for local LLM/VLM inference)

2. Local AI Engine (Ollama)

The pipeline uses Mistral for text embeddings and Gemma 4 (VLM) for image analysis.

    # Install Ollama (skip if already installed)
    curl -fsSL https://ollama.com/install.sh | sh
    
    # Pull the required models
    # Gemma 4 is used for the vision pipeline
    ollama pull gemma4
    
    # Mistral is used for NLP and semantic embedding
    ollama pull mistral
3. Clone the Repository
   
Start by cloning the project to your local machine:

    # git clone https://github.com/Nikesh559/pixels.git
    # cd pixels

4. Virtual Environment Setup
   
It is highly recommended to use a virtual environment to isolate project dependencies

    # python3 -m venv venv
    # source venv/bin/activate
    
Install Dependencies:

    # pip3 install --upgrade pip
    # pip3 install -r requirements.txt


5. Build and Launch
   
Build the images and start containers in detached mode (background)
    
    # docker-compose up --build -d
   
