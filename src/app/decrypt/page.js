"use client";
import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { toast } from 'react-hot-toast';
import Link from 'next/link'

const Home = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(''); 
  const [fileContent, setfileContent] = useState('')
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

    const decryptedString = decryptString(fileContent, password);
    if (decryptedString)  {
      const extension = getExtension(decryptedString);
      const base64Data = decryptedString.split(',')[1];
      var binaryData = atob(base64Data);
      // Create a Uint8Array to hold the binary data
      var byteArray = new Uint8Array(binaryData.length);
      // Populate the Uint8Array with the binary data
      for (var i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
      }
      var blob = new Blob([byteArray], { type: decryptedString.split(';')[0].replace('data:', '') });

      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);

      link.download = `${fileName}_decrypted${extension}`;

      document.body.appendChild(link);

      link.click();
    }
  };


  const decryptString = (text, password) => {
    try{
      const decrypted = CryptoJS.AES.decrypt(text, password).toString(CryptoJS.enc.Utf8);
      return decrypted;
    }catch(err){
      toast.error("Wrong Password");
    }
  }; 
  
  function getExtension(data) {
    var mimeType = data.split(';')[0].replace('data:', '');
    switch (mimeType) {
        case 'application/vnd.ms-powerpoint':
            return '.ppt';
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return '.docx';
        case 'application/pdf':
            return '.pdf';
        case 'image/jpeg':
            return '.jpg';
        case 'image/png':
            return '.png';
        case 'application/json':
            return 'json';
        case 'video/mp4':
            return '.mp4';
        default:
            return 'unknown';
    }
  }

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setfileContent(reader.result);
      };
      
      // reader.readAsDataURL(selectedFile);
      reader.readAsText(selectedFile)
      setFile(selectedFile);
      setFileName(selectedFile.name.split('.')[0]);
    } else {
      toast.error("Please select a valid .cipher file");
    }
  };
  


  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-black dark:text-white">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">Decrypt File</h1>
        <input 
        className="w-4/5 p-2 m-2 border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white bg-white dark:bg-black"
        accept=".cipher"
        type="file" onChange={handleFileChange} 
        />

        <input 
        className="w-auto p-1 m-2 border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white bg-white dark:bg-black"
        type="password" 
        value={password} 
        onChange={handlePasswordChange} 
        placeholder="Password"
        />

        <div className="flex flex-row items-center">
          <button 
            className="p-2 m-3 bg-gray-500 text-white dark:bg-blue dark:text-black rounded-lg mt-2"
            type="submit"
            onClick={handleSubmit}
          >
            Decrypt
          </button>
          <Link 
            href="/"
            className="p-2 m-3 bg-gray-500 text-white dark:bg-blue dark:text-black rounded-lg mt-2"
          >
              Encrypt
          </Link>
        </div>
      </div>
    </div>
    
  );
};

export default Home;
