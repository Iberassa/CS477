const express = require('express');
const { route } = require('.');
const router = express.Router();
const fs = require('fs');
const readFile = require('./readBookFile');

router.get('/', (req, res) => {
    res.json({ status: 'Success', Data: readFile('./booksFile.txt') })
})


router.get('/:id', (req, res) => {
    let allBooks = readFile('./booksFile.txt');
    let output = [];
    let exists = false;
    for (let elem of allBooks) {
        if (elem.id == req.params.id) {
            output.push(elem);
            exists = true;
        }
    }
    if (exists) {
        res.json({ status: 'Success', Data: output });
    } else {
        res.json({ status: 'success', Data: allBooks })
    }
})


router.post('/', (req, res) => {
    let allBooks = readFile('./booksFile.txt');
    let exists = false;
    console.log(req.body)
    for (let elem of allBooks) {
        if (req.body.id == elem.id) {
            exists = true;
            break;
        }
    }
    let writeStream = fs.createWriteStream('./booksFile.txt', { flags: 'a' });
    if (exists) {
        res.json({ status: 'Book already exists in the file', Data: readFile('./booksFile.txt') })
    } else {
        writeStream.write(`\n${req.body.id},${req.body.title},${req.body.ISBN},${req.body.publishedDate},${req.body.author}`);
        let outputData = readFile('./booksFile.txt');
        res.json({ status: 'Success', Data: outputData });
    }
})


router.put('/:id', (req, res) => {
    let allBooks = readFile('./booksFile.txt');
    for (let elem of allBooks) {
        if (elem.id == req.params.id) {
            elem.title = req.body.title;
            elem.ISBN = req.body.ISBN;
            elem.publishedDate = req.body.publishedDate;
            elem.author = req.body.author;
        }
    }
    let writeStream = fs.createWriteStream('./booksFile.txt');
    let count = 0;
    for (let elem of allBooks) {
        if (count === 0) {
            writeStream.write(`${elem.id},${elem.title},${elem.ISBN},${elem.publishedDate},${elem.author}`)
            count++;
        } else {
            writeStream.write(`\n${elem.id},${elem.title},${elem.ISBN},${elem.publishedDate},${elem.author}`)
        }
    }
    res.json({ status: 'Success', Data: allBooks });
})


router.delete('/:id', (req, res) => {
    let allBooks = readFile('./booksFile.txt');
    let updatedBook = allBooks.filter(item => {
        return req.params.id != item.id;
    })
    let writeStream = fs.createWriteStream('./booksFile.txt');
    let count = 0;
    for (let elem of updatedBook) {
        if (count === 0) {
            writeStream.write(`${elem.id},${elem.title},${elem.ISBN},${elem.publishedDate},${elem.author}`)
            count++;
        } else {
            writeStream.write(`\n${elem.id},${elem.title},${elem.ISBN},${elem.publishedDate},${elem.author}`)
        }
    }
    res.json({ status: 'Success', Data: updatedBook });
})
module.exports = router;