const http = require('http');
const fs = require('fs');


function readfile(path){
    let output = []
    let readFile = fs.readFileSync(path,{encoding:'utf-8'},(err)=>{});
    let booksArr =readFile.split('\n');
    for(let elem of booksArr){
        let booksArr = elem.split(',');
        output.push({
            id:booksArr[0],
            title:booksArr[1],
            ISBN: booksArr[2],
            publishedDate:booksArr[3],
            author:booksArr[4]
        })
}
return output;
}

module.exports = readfile