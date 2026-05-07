const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

/* Temporary In-Memory Storage */
let formData = [];

/* Home Route */
app.get('/', (req, res) => {
    res.send('Nested Form API Running');
});

/* Save Questions */
app.post('/save', (req, res) => {

    formData = req.body;

    res.json({
        message: 'Data saved successfully',
        data: formData,
    });

});

/* Get Questions */
app.get('/questions', (req, res) => {

    res.json(formData);

});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});