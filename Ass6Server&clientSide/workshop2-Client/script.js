let layoutDiv = document.querySelector('#layOutDiv');
//List all
let listAllButt = document.querySelector('#listBooks');

//List by id
let idValue = document.querySelector('#idValue');
let listByIDButt = document.querySelector('#listByID');

//Create and Update book  
let createBookButt = document.querySelector('#createBook');
let updateBookButt = document.querySelector('#updateBook');
let bookid = document.querySelector('#bookID');
let title = document.querySelector('#title');
let isbn = document.querySelector('#isbn');
let publishedDate = document.querySelector('#publishedDate');
let author = document.querySelector('#author');

//Delete by id
let deleteBookButt = document.querySelector('#deleteBookbutt');
let deletebookID = document.querySelector('#deleteBookID');


//Display
let display = document.querySelector('.display');

//Event listeners for buttons
listAllButt.addEventListener('click', listAll);
listByIDButt.addEventListener('click',bookValueByID);
createBookButt.addEventListener('click', createBook);
updateBookButt.addEventListener('click', updateBook);
deleteBookButt.addEventListener('click', deleteBook);


function listAll() {
   displayBooks();
}


//Display all books
function displayBooks() {
    display.innerHTML=' ';
    fetch('http://localhost:5000/api/v1/books', {
        method: "GET",
    })
        .then(res => res.json())
        .then(data => {
            for (let elem of data.Data) {
                if (display.innerHTML === ' ') {
                    display.innerHTML = `id=${elem.id}, title: ${elem.title}, ISBN: ${elem.ISBN}, published: ${elem.publishedDate}, Author:${elem.author}`
                } else {
                    display.innerHTML += `\nid=${elem.id}, title: ${elem.title}, ISBN: ${elem.ISBN}, published: ${elem.publishedDate}, Author:${elem.author}`
                }
            }
        })
}



//Display Book by Book ID
function bookValueByID() {
    display.innerHTML=' ';
    fetch(`http://localhost:5000/api/v1/books/${idValue.value}`, {
        method: "GET",
    })
        .then(res => res.json())
        .then(data => {
            for (let elem of data.Data) {
                if(data.Data.length!==1){
                if (display.innerHTML === ' ') {
                    display.innerHTML = `id=${elem.id}, title: ${elem.title}, ISBN: ${elem.ISBN}, published: ${elem.publishedDate}, Author:${elem.author}`
                } else {
                    display.innerHTML += `\nid=${elem.id}, title: ${elem.title}, ISBN: ${elem.ISBN}, published: ${elem.publishedDate}, Author:${elem.author}`
                }
            }else{
                display.innerHTML = `id=${elem.id}, title: ${elem.title}, ISBN: ${elem.ISBN}, published: ${elem.publishedDate}, Author:${elem.author}`
            }
            }
        })
}




//create new book data 
function createBook() {
    display.innerHTML=' ';
    let insertedbook = { id: `${bookid.value}`, title: `${title.value}`, ISBN: `${isbn.value}`, publishedDate: `${publishedDate.value}`, author: `${author.value}` }
    console.log(insertedbook)
    fetch('http://localhost:5000/api/v1/books', {
        method: 'POST',
        body: JSON.stringify(insertedbook),
        headers: {
            "Content-Type": "application/json",
          },
    })
        .then(res => res.json())
        .then(data => {
            let display = document.querySelector('.display')
            console.log(data)
            for (let elem of data.Data) {
                if (display.innerHTML === ' ') {
                    display.innerHTML = `id=${elem.id}, title: ${elem.title}, ISBN: ${elem.ISBN}, published: ${elem.publishedDate}, Author:${elem.author}`
                } else {
                    display.innerHTML += `\nid=${elem.id}, title: ${elem.title}, ISBN: ${elem.ISBN}, published: ${elem.publishedDate}, Author:${elem.author}`
                }
            }
        })
}



//Delete Book by ID
function deleteBook(){
    display.innerHTML=' ';
    fetch(`http://localhost:5000/api/v1/books/${deletebookID.value}`, {
        method: "DELETE",
    })
        .then(res => res.json())
        .then(data => {
            let display = document.querySelector('.display')
            console.log(data)
            for (let elem of data.Data) {
                if (display.innerHTML === ' ') {
                    display.innerHTML = `id=${elem.id}, title: ${elem.title}, ISBN: ${elem.ISBN}, published: ${elem.publishedDate}, Author:${elem.author}`
                } else {
                    display.innerHTML += `\nid=${elem.id}, title: ${elem.title}, ISBN: ${elem.ISBN}, published: ${elem.publishedDate}, Author:${elem.author}`
                }
            }
        })
}




//Update Book file
function updateBook(){
    display.innerHTML=' ';
    let insertedbook = { id: `${bookid.value}`, title: `${title.value}`, ISBN: `${isbn.value}`, publishedDate: `${publishedDate.value}`, author: `${author.value}` }
    fetch(`http://localhost:5000/api/v1/books/${bookid.value}`, {
        method: 'PUT',
        body: JSON.stringify(insertedbook),
        headers: {
            "Content-Type": "application/json",
          },
    })
        .then(res => res.json())
        .then(data => {
            let display = document.querySelector('.display')
            console.log(data)
            for (let elem of data.Data) {
                if (display.innerHTML === ' ') {
                    display.innerHTML = `id=${elem.id}, title: ${elem.title}, ISBN: ${elem.ISBN}, published: ${elem.publishedDate}, Author:${elem.author}`
                } else {
                    display.innerHTML += `\nid=${elem.id}, title: ${elem.title}, ISBN: ${elem.ISBN}, published: ${elem.publishedDate}, Author:${elem.author}`
                }
            }
        })
}