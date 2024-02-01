"use client";
import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { toast } from 'react-hot-toast';
import Link from 'next/link'

const Home = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(''); 
  const [base64String, setBase64String] = useState('')
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file");
      return;
    }
    if (!password) {
      toast.error("Please enter a password");
      return;
    }
    const encryptedString = encryptString(base64String, password);
    const blob = new Blob([encryptedString], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.cipher`;
    link.click();
  };

  const encryptString = (text, password) => {
    const encrypted = CryptoJS.AES.encrypt(text, password).toString();
    return encrypted;
  }; 
  

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend =  () => {
        setBase64String(reader.result);
      };

      reader.readAsDataURL(selectedFile);
    }
    setFile(selectedFile);
    setFileName(selectedFile.name.split('.')[0]);
  };


  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };



  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-black dark:text-white">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Encrypt File</h1>
        <input 
        className="w-4/5 p-2 m-2 border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white bg-white dark:bg-black"
        type="file" onChange={handleFileChange} 
        />

        <input 
        className="w-auto p-1 m-2 border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white bg-white dark:bg-black"
        type="password" value={password} onChange={handlePasswordChange} 
        placeholder="Password"
        />

        <div className="flex flex-row items-center">
          <button 
            className="p-2 m-3 bg-gray-500 text-white dark:bg-blue dark:text-black rounded-lg mt-2"
            type="submit"
            onClick={handleSubmit}
          >
            Encrypt
          </button>
          <Link 
            href="/decrypt"
            className="p-2 m-3 bg-gray-500 text-white dark:bg-blue dark:text-black rounded-lg mt-2"
          >
              Decrypt
          </Link>
        </div>
      </div>

    </div>
    
  );
};

export default Home;
