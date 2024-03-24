import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('http://localhost:5000/process-image', formData, {
          responseType: 'blob', // Ensure response type is set to blob
        });
        const blob = new Blob([response.data], { type: 'image/png' });
        const objectURL = URL.createObjectURL(blob);
        setProcessedImage(objectURL);
      } catch (error) {
        console.error('Error sending image:', error);
      }
    }
  };

  return (
    <>
      <form className="max-w-lg mx-auto">
        <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload file</label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-500 rounded-lg cursor-pointer bg-gray-300 dark:text-gray-400 focus:outline-none dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 p-5"
          aria-describedby="user_avatar_help"
          id="base-type"
          type="file"
          onChange={(e) => {
            setUploadedImage(URL.createObjectURL(e.target.files[0]));
            handleFileChange(e);
          }}
        />
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">Upload a traffic image for further processing.</div>
      </form>
      <div className="flex p-2">
        {uploadedImage && (
          <div className="mx-auto">
            <img src={uploadedImage} alt="Uploaded" className="mx-auto image" />
          </div>
        )}
        {processedImage && (
          <div className="mx-auto">
            <img src={processedImage} alt="Processed" className="mx-auto image" />
          </div>
        )}
      </div>
    </>
  );
};

export default Form;
