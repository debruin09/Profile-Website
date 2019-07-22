// dotenv, express
require('dotenv').config();
const express = require('express');
const path = require('path');
const sendMail = require('./mail');
const { log } = console;
const app = express();

const PORT = 8080;


// Data parsing
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());



// email, subject, text
app.post('/email', (req, res) => {
    const { subject, email, text } = req.body;
    log('Data: ', req.body);

    sendMail(email, subject, text, function(err, data) {
        if (err) {
            log('ERROR: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        log('Email sent!!!');
        return res.json({ message: 'Email sent!!!!!' });
    });
});


app.use(express.static(__dirname + '/public'));

// home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views', 'index.html'));
});

app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views', 'contact.html'));
});

app.get('/about-me.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views', 'about-me.html'));
});

app.get('/projects.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views', 'projects.html'));
});

// Error page
app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views', '404.html'));
});

// Email sent page
app.get('/email/sent', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views', 'success.html'));
});



//Load styles
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views', 'styles.css'));
});


// Start server
app.listen(PORT, () => log('Server is starting on PORT, ', 8080));