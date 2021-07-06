const express = require('express');
const router = express.Router();
const fs = require('fs');
const readFile = require('./readFile');


router.get('/', (req, res) => {
    res.json({ Status: 'Success', Result: readFile('./courses.txt') });
})


router.get('/:id', (req, res) => {
    let coursesList = readFile('./courses.txt');
    let exists = false;
    let output;
    for (let elem of coursesList) {
        if (elem.id === req.params.id) {
            exists = true;
            output = elem
            break;
        }
    }
    if (exists) {
        res.json({ Status: 'Success', Result: output });
    } else
        res.json({ Status: 'Success', Result: coursesList });
})


router.post('/', (req, res) => {
    let coursesList = readFile('./courses.txt');
    let exists = false;
    for (let elem of coursesList) {
        if (elem.id == req.body.id) {
            exists = true;
            break;
        }
    }
    let writeStream = fs.createWriteStream('./courses.txt', { flags: 'a' });
    if (exists) {
        res.json({ Status: 'Success', Result: 'Course already exists' })
    } else {
        let data = `${req.body.id}-${req.body.name}-${req.body.code}`;
        writeStream.write(`\n${data}`);
        let output = readFile('./courses.txt');
        res.json({ Status: 'Success', Result: output });
    }
})


router.put('/:id', (req, res) => {
    let coursesList = readFile('./courses.txt');
    for (let elem of coursesList) {
        if (elem.id == req.params.id) {
            elem.name = req.body.name;
            elem.code = req.body.code;
            break;
        }
    }
    let writeFile = fs.createWriteStream('./courses.txt');
    let count = 0;
    for (let elem of coursesList) {
        if (count === 0) {
            writeFile.write(`${elem.id}-${elem.name}-${elem.code}`)
            count++;
        } else {
            writeFile.write(`\n${elem.id}-${elem.name}-${elem.code}`)
        }
    }
    res.json({ status: 'Success', Data: coursesList });
})


router.delete('/:id', (req, res) => {
    let courseList = readFile('./courses.txt');
    let updatedCourse = courseList.filter((item) => {
        return req.params.id != item.id;
    })
    let writecourse = fs.createWriteStream('./courses.txt');
    let count = 0;
    for (let elem of updatedCourse) {
        if (count === 0) {
            count++;
            writecourse.write(`${elem.id}-${elem.name}-${elem.code}`)
        } else {
            writecourse.write(`\n${elem.id}-${elem.name}-${elem.code}`)
        }
    }
    res.json({ Status: 'Success', Result: updatedCourse })
})
module.exports = router;