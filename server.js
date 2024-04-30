const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
(app.use(express.static(path.join(process.cwd(), "static"))));
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const FormSchema = new mongoose.Schema({
    name: String,
    nameOwner: String,
    AboutTrust: String,
    services: String,
    trustno: Number,
    type: String
});

const FormModel = mongoose.model('Form', FormSchema);
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
    const formData = req.body;
    console.log(formData);
    FormModel.create(formData)
    res.send("Form has been Submitted!!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
