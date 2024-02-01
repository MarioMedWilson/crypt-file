"use client";
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const Home = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(''); 
  const [cyrptoString, setCryptoString] = useState(''); 
  const [base64String, setBase64String] = useState('')
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected File:', file);
    console.log('Password:', password);
    console.log('File Name:', fileName);
    const encryptedString = encryptString(base64String, password);
    console.log('Encrypted String:', encryptedString);
  };

  const encryptString = (text, password) => {
    const encrypted = CryptoJS.AES.encrypt(text, password).toString();
    return encrypted;
  }; 
  

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
  
    if (selectedFile && selectedFile.type === "text/plain") {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        setBase64String(reader.result);
      };
  
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      console.error("Please select a valid .txt file");
    }
  };
  


  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    console.log(newPassword);
  };

  const handleDownload = async () => {
    // Call the API route
    const response = await fetch('/api');
    console.log(response);
    const text = await response.text();
    console.log(text);
    // Create a Blob from the text
    const blob = new Blob([text], { type: 'text/plain' });

    // Create a link element and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${"file"}.txt`;
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-black dark:text-white">
      <div className="flex flex-col items-center">
        <input 
        className="w-4/5 p-2 m-2 border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white bg-white dark:bg-black"
        accept=".txt"
        type="file" onChange={handleFileChange} 
        />

        <input 
        className="w-auto p-1 m-2 border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white bg-white dark:bg-black"
        type="password" value={password} onChange={handlePasswordChange} 
        />

        <button 
          className="p-2 bg-gray-500 text-white dark:bg-blue dark:text-black rounded-lg mt-2"
          type="submit"
          onClick={handleSubmit}
        >
          Decrypt
        </button>
      </div>

      <div>
      <button onClick={handleDownload}>Download Text File</button>
      </div>
    </div>
    
  );
};

export default Home;
