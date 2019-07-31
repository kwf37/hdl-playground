const express = require('express');
const path = require('path');
const router = express.Router();

const pageDir = path.join(__dirname, '..', '..', 'client', 'public');

router.get('/', function(req, res) {
    res.sendFile(path.join(pageDir, 'welcome.html'));
});

router.get('/login', function(req, res) {
    res.sendFile(path.join(pageDir, 'login.html'));
});

router.get('/register', function(req, res) {
    res.sendFile(path.join(pageDir, 'register.html'));
});

router.get('/index', function(req, res) {
    res.sendFile(path.join(pageDir, 'index.html'));
});

router.get('/playground', function(req, res) {
    res.sendFile(path.join(pageDir, 'playground.html'));
});

module.exports = router;