var express = require('express');
const fs = require('fs');
const path = require('path');
const { use } = require('../../../Ass4Express/Myapp/routes');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  const readUsers = fs.createReadStream('./users.txt', { encoding: 'utf-8' })
  readUsers.on('data', (data) => {
    const singleUser = data.split('\n');
    let outputData = [];
    for (let elem of singleUser) {
      let userData = elem.split('-');
      outputData.push({ id: userData[0], firstname: userData[1], lastname: userData[2] });
    }
    res.json({ status: 'Success', data: outputData })
  })
  //res.send('respond with a resource');
});

router.get('/:id', function (req, res, next) {
  const readUsers = fs.createReadStream('./users.txt', { encoding: 'utf-8' });
  let exists = false;
  readUsers.on('data', (data) => {
    const singleUser = data.split('\n');
    let outputData = [];
    for (let elem of singleUser) {
      let userData = elem.split('-');
      if (userData[0] == req.params.id) {
        exists = true;
        outputData.push({ id: userData[0], firstname: userData[1], lastname: userData[2] });
        break;
      }
    }
    if (exists) {
      res.json({ status: 'success', data: outputData });
    } else {
      res.json({ status: 'Success', data: 'User unavailable' });
    }
  })
});

router.post('/', function (req, res, next) {
  let writeStream = fs.createWriteStream('./users.txt', { flags: 'a' });
  let exists = false;
  fs.readFile(path.join(__dirname, '../users.txt'), { encoding: 'utf-8' }, (err, data) => {
    let usersObj = data.split('\n');
    for (let elem of usersObj) {
      singleUser = elem.split('-');
      if (req.body.id == singleUser[0]) {
        exists = true;
        break
      }
    }
    if (exists) {
      res.json({ status: 'success', data: 'User already exist' });
    } else {
      const dataStri = `${req.body.id}-${req.body.firstname}-${req.body.lastname}`
      writeStream.write(`${req.body.id}-${req.body.firstname}-${req.body.lastname}\n`)
      res.json({ status: 'Success', data: dataStri });
    }
  })
})

router.put('/:id', function (req, res, next) {
  let exists = false;
  let userArr = [];
  let updatedUsers = [];
  fs.readFile(path.join(__dirname, '../users.txt'), { encoding: 'utf-8' }, (err, data) => {
    let usersObj = data.split('\n');
    for (let elem of usersObj) {
      singleUser = elem.split('-');
      userArr.push({ id: singleUser[0], firstname: singleUser[1], lastname: singleUser[2] });
    }
    updatedUsers = userArr.map((item) => {
      if (item.id == req.params.id) {
        if (req.body.firstname !== undefined) {
          item.firstname = req.body.firstname
        }
        if (req.body.lastname !== undefined) {
          item.lastname = req.body.lastname
        }
        console.log(item.firstname)
      }
      return item
    })
    console.log(updatedUsers)
    let writeStream = fs.createWriteStream('./users.txt');
    for (let elem of updatedUsers) {
      console.log(elem)
      writeStream.write(`\n${elem.id}-${elem.firstname}-${elem.lastname}`);
    }
    res.json({ status: 'Success', data: updatedUsers });
  })
});

router.delete('/:id', function (req, res, next) {
  let exists = false;
  let userArr = [];
  let updatedUsers = [];
  let obj = [];
  let objOutput = []
  fs.readFile(('./users.txt'), { encoding: 'utf-8' }, (err, data) => {
    let usersObj = data.split('\n');
    for (let elem of usersObj) {
      singleUser = elem.split('-');
      userArr.push({ id: singleUser[0], firstname: singleUser[1], lastname: singleUser[2] });
    }
    updatedUsers = userArr.filter((item) => {
      if (item.id == req.params.id) {
        exists = true;
      }
      return req.params.id != item.id
    })
    let writeStream = fs.createWriteStream('./users.txt');
    for (let elem of updatedUsers) {
      if (elem.id !== '') {
        objOutput.push(elem);
        obj = `${elem.id}-${elem.firstname}-${elem.lastname}\n`
        writeStream.write(`${obj}`);
      }
    }
    res.json({ status: 'Success', data: objOutput });
  })
});

module.exports = router;
