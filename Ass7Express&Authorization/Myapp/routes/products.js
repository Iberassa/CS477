const express = require('express');
const router = express.Router();
const readFile = require('./readFile');
const fs = require('fs');


router.get('/', (req, res) => {
    res.json({ Status: 'Success', Result: readFile('./products.txt') });
})


router.get('/:id', (req, res) => {
    let productList = readFile('./products.txt');
    let exists = false;
    let output;
    for (let elem of productList) {
        if (elem.id === req.params.id) {
            exists = true;
            output = elem
            break;
        }
    }
    if (exists) {
        res.json({ Status: 'Success', Result: output });
    } else
        res.json({ Status: 'Success', Result: productList });
})





router.post('/', (req, res) => {
    let productList = readFile('./products.txt');
    let exists = false;
    for (let elem of productList) {
        if (elem.id == req.body.id) {
            exists = true;
            break;
        }
    }
    let writeStream = fs.createWriteStream('./products.txt', { flags: 'a' });
    if (exists) {
        res.json({ Status: 'Success', Result: 'Course already exists' })
    } else {
        let data = `${req.body.id}-${req.body.name}-${req.body.price}`;
        writeStream.write(`\n${data}`);
        let output = readFile('./products.txt');
        res.json({ Status: 'Success', Result: output });
    }
})


router.put('/:id', (req, res) => {
    let productsList = readFile('./products.txt');
    for (let elem of productsList) {
        if (elem.id == req.params.id) {
            elem.name = req.body.name;
            elem.price = req.body.price;
            break;
        }
    }
    let writeFile = fs.createWriteStream('./products.txt');
    let count = 0;
    for (let elem of productsList) {
        if (count === 0) {
            writeFile.write(`${elem.id}-${elem.name}-${elem.price}`)
            count++;
        } else {
            writeFile.write(`\n${elem.id}-${elem.name}-${elem.price}`)
        }
    }
    res.json({ status: 'Success', Data: productsList });
})


router.delete('/:id', (req, res) => {
    let productList = readFile('./products.txt');
    let updatedProducts = productList.filter((item) => {
        return req.params.id != item.id;
    })
    let writeProduct = fs.createWriteStream('./products.txt');
    let count = 0;
    for (let elem of updatedProducts) {
        if (count === 0) {
            count++;
            writeProduct.write(`${elem.id}-${elem.name}-${elem.price}`)
        } else {
            writeProduct.write(`\n${elem.id}-${elem.name}-${elem.price}`)
        }
    }
    res.json({ Status: 'Success', Result: updatedProducts })
})


module.exports = router;