# Use the official Python image as base
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR .

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire current directory into the container's working directory
COPY . .

# Expose port 5000 to the outside world
EXPOSE 5000

# Command to run the Flask application
CMD ["python", "main.py"]
