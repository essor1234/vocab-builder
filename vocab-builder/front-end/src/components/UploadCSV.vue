<template>
   <div>
     <input type="file" @change="handleFileUpload" />
     <button @click="uploadFile">Upload</button>
   </div>
 </template>

 <script>
 import axios from 'axios';
 
 export default({
    data() {
        return {
             // Store input csv file
            file: null,
        };
    },
    methods: {
        handleFileUpload(event){
            // Get the first file that user choose
            this.file = event.target.files[0];
            console.log('Selected file:', this.file);
        },
        uploadFile(){
            // Check if there is selected file
            if (!this.file) {
            console.error('No file selected');
            return;
        }
            const formData = new FormData();
            formData.append('file', this.file);

             axios.post('http://localhost:3000/words/upload-csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(response => {
                console.log('File uploaded successfully:', response.data);
            })
       .catch(error => {
         console.error('Error uploading file:', error.response ? error.response.data : error.message);
       });
    
   
        },
    },
 })
 </script>

 <style>
  .drop-container {
    position: relative;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    padding: 20px;
    border-radius: 10px;
    border: 2px dashed #555;
    color: #444;
    cursor: pointer;
    transition: background 0.2s ease-in-out, border 0.2s ease-in-out;
  }

  .drop-container:hover {
    background: #eee;
    border-color: #111;
  }

  .drop-container:hover .drop-title {
    color: #222;
  }

  .drop-title {
    color: #444;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    transition: color 0.2s ease-in-out;
  }
</style>