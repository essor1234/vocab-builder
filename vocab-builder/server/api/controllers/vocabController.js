const mongoose = require('mongoose');
const Vocab = mongoose.model("Vocab");
// npm csv
const csv = require('csvtojson');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

exports.list_all_words = (req, res) => {
    Vocab.find({}, (err, words)=>{
        if (err) res.send(err);
        res.json(words);
    })
};

exports.create_a_word = (req, res) => {
    const newWord = new Vocab(req.body);
    newWord.save((err, words)=>{
        if (err) res.send(err);
        res.json(words);
    })
};

exports.read_a_word = (req, res) => {
    // console.log("Fetching word with ID:", typeof(req.params.wordId));
    Vocab.findById(req.params.wordId, (err, word)=>{
        if(err) res.send(err);
        res.json(word);
    })
};

exports.update_a_word = (req, res) => {
    Vocab.findOneAndUpdate(
        {_id: req.params.wordId},
        req.body,
        {new: true},
        (err, words)=>{
        if (err) res.send(err);
        res.json(words);
    })
};


exports.delete_a_word = (req, res) => {
    Vocab.deleteOne({_id: req.params.wordId}, err=>{
        if (err) res.send(err);
        res.json({
            message: "Word successfully deleted",
            _id: req.params.wordId
        });
    });


};

// Import by csv file

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

exports.upload_csv = (req, res) => {
    const csvFilePath = req.file.path;

    // Read the first line to detect the delimiter
    fs.readFile(csvFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading CSV file');
        }

        // Get the first line
        const firstLine = data.split('\n')[0];

        // Determine the delimiter based on the first line
        const delimiter = firstLine.includes('\t') ? '\t' : ',';

        csv({
            noheader: false,
            delimiter: delimiter // Use the detected delimiter
        })
        .fromFile(csvFilePath)
        .then(async (jsonObj) => {
            // Insert each row into MongoDB
            try {
                const result = await Vocab.insertMany(jsonObj);
                res.status(200).json(result);
            } catch (error) {
                console.error(error);
                res.status(500).send('Error processing CSV file');
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error parsing CSV file');
        });
    });
};

 // Middleware to handle file upload
 exports.uploadMiddleware = upload.single('file');



