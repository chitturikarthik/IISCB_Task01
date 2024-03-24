import cv2
import pandas as pd
from ultralytics import YOLO
import cvzone
import numpy as np
from tracker import Tracker
from flask import Flask, request, make_response
import base64
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the YOLO model
model = YOLO('yolov8s.pt')

@app.route('/process-image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return "No image file", 400

    file = request.files['image']
    if file.filename == '':
        return "No selected file", 400

    if file:
        print("Image received") # Debugging print statement
        # Convert the image file to a format that can be used by OpenCV
        image_bytes = file.read()
        image = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_UNCHANGED)

        # Load class names
        my_file = open("coco.txt", "r")
        data = my_file.read()
        class_list = data.split("\n")

        # Initialize the tracker
        tracker = Tracker()

        # Process the image
        results = model.predict(image)
        a = results[0].boxes.data
        px = pd.DataFrame(a).astype("float")

        # Initialize counters for different vehicle types
        vehicle_counters = {'car': 0, 'bus': 0, 'truck': 0}

        for index, row in px.iterrows():
            x1, y1, x2, y2, d = int(row[0]), int(row[1]), int(row[2]), int(row[3]), int(row[5])
            c = class_list[d]
            if c in vehicle_counters:
                vehicle_counters[c] += 1
                cv2.rectangle(image, (x1, y1), (x2, y2), (255, 0, 255), 2)
                cv2.putText(image, f'{c}', (x1, y1), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

        # Convert the processed image back to bytes
        _, img_encoded = cv2.imencode('.png', image)
        img_io = io.BytesIO(img_encoded.tobytes())

        # Create a response object with the image data and set the content type to image/png
        response = make_response(img_io.getvalue())
        response.headers.set('Content-Type', 'image/png')

        return response

if __name__ == '__main__':
    app.run(debug=True)
