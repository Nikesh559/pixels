# Use official Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements first (for caching)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose port (if app runs on a port)
EXPOSE 8000

# Run the app (change as per your project)
CMD ["uvicorn", "src.controller:app", "--reload"]