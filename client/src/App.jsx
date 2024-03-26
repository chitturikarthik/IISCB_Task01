
import React from 'react';
import Form from './Form';
import './App.css'
function App() {
 return (
    <div className="App">
      <h2 className='text-center text-2xl text-white mt-4 font-bold'>IISc Banglore Web Development Internship Task01</h2>
      <p className='text-center text-xl text-white my-3'>Name : <a href='https://ch-gold.vercel.app' target='new' className='text-blue-400 underline'>Karthik Chitturi</a></p>
      <Form/>
      <p className='text-center text-yellow-500 text-m'>Employed YOLOv8 and OpenCV to implement object-detection.</p>
    </div>
 );
}

export default App;
