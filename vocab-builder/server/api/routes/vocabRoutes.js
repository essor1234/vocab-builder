const vocabBuilder = require('../controllers/vocabController');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

module.exports = app => {
    app
    .route('/words')
    .get(vocabBuilder.list_all_words)
    .post(vocabBuilder.create_a_word);

    app
    .route('/words/:wordId')
    .get(vocabBuilder.read_a_word)
    .put(vocabBuilder.update_a_word)
    .delete(vocabBuilder.delete_a_word);

    // Define the route for uploading and processing the CSV file
    app.route('/words/upload-csv')
    .post(upload.single('file'), vocabBuilder.upload_csv);



    
}