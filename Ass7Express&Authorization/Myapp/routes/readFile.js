const http = require('http');
const fs = require('fs');


function readfile(path) {
    let output = []
    let readFile = fs.readFileSync(path, { encoding: 'utf-8' }, (err) => { });
    let booksArr = readFile.split('\n');
    for (let elem of booksArr) {
        let booksArr = elem.split('-');
        if (path === './products.txt') {
            output.push({
                id: booksArr[0],
                name: booksArr[1],
                price: booksArr[2],
            })
        } else if(path==='./courses.txt'){
            output.push({
                id: booksArr[0],
                name: booksArr[1],
                code: booksArr[2],
            })
        }else{
            output.push({
                id:booksArr[0],
                username:booksArr[1],
                password:booksArr[2],
            })
        }
    }
    return output;
}

module.exports = readfile;