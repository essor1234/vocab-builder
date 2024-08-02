<template>
  <div class="upload-container">
    <label class="upload-label" for="fileUpload">
      <input 
        type="file" 
        id="fileUpload" 
        class="upload-input" 
        @change="handleFileUpload" 
      />
      <span class="upload-button">
        <i class="fa fa-upload"></i>
        Choose File
      </span>
      <span class="upload-filename" v-if="file">{{ file.name }}</span>
    </label>
    <button class="upload-submit" @click="uploadFile">Upload</button>
  </div>
</template>


 <script>
 import {api} from '../helpers/helpers'
 
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
        async uploadFile(){
            // Check if there is selected file
            if (!this.file) {
            console.error('No file selected');
            return;
        }
           try{
            const res = await api.uploadCSV(this.file);
            console.log(res);
            // Check if data already exist
            if(res.code == 11000){
                this.flash('Some objects already exist', 'error');
                return;
            } 
            this.flash('File uploaded successfully!','success');


           }catch(error){
                console.error('Error uploading file:', error);           
                }
        },
    },
 })
 </script>

 <style scoped>
.upload-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.upload-label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.upload-input {
  display: none;
}

.upload-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.upload-button:hover {
  background-color: #0056b3;
}

.upload-filename {
  font-size: 14px;
  color: #333;
}

.upload-submit {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.upload-submit:hover {
  background-color: #218838;
}
</style>
