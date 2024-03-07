const { parse } = require("path");
const books = require("./books");
const http = require("http");
const port = 8000;
const host_name = "localhost";

const server = http.createServer((req, res) => {
  //   console.log(books.books);
  if (req.url === "/books" && req.method === "GET") {
    const parsedData = books.books;
    const stringifiedData = JSON.stringify(parsedData);
    res.end(stringifiedData);
  }

  if (req.url === "/books" && req.method === "POST") {
    const booksArray = books.books; //grabbing the books array from the js file
    console.log(booksArray); //just to make sure.
    const lastObject = booksArray[booksArray.length - 1]; //we'll need the most recent/last id to give the new array a correct id
    const id = lastObject.id;

    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      stringifiedBody = Buffer.concat(body).toString();
      const parsedBody = JSON.parse(body);
      parsedBody.id = id + 1; //set the new object id to one plus the most recent id
      console.log(parsedBody);
      booksArray.push(parsedBody);
      //   if (err) {
      //     console.log(`Internal Server Error, ${err}`);
      //   } Not using an fs, so this is useless
      StringifiedBooksArray = JSON.stringify(booksArray);
      res.end(StringifiedBooksArray);
    });
  }

  // use the below text as the test body. Please, don't stress my code.
  //   {
  //     "title": "The secret to life",
  //     "author": "Obi Chidubem"
  //   }

  if (req.url === "/books" && req.method === "DELETE") {
    console.log("Whyyy?");
    const arr = books.books;
    arr.splice(0, arr.length);
    res.end(JSON.stringify(arr));
  }

  if (req.url === "/books/author" && req.method === "GET") {
    const parsedData = books.books;
    const authors = [];
    for (i = 0; i < parsedData.length; i++) {
      const author = parsedData[i].author;
      authors.push(author);
    }
    const stringifiedAuthors = JSON.stringify(authors);
    res.end(stringifiedAuthors);
  }

  if (req.url === "/books/author" && req.method === "PUT") {
    const parsedData = books.books;
    const authorAndId = []; //The input data will be both the author and an Id to place the author into
    req.on("data", (chunk) => {
      authorAndId.push(chunk);
    });
    req.on("end", () => {
      const stringifiedAuthorAndId = Buffer.concat(authorAndId).toString();
      const parsedAuthorAndId = JSON.parse(stringifiedAuthorAndId);
      console.log(JSON.stringify(parsedAuthorAndId.id));
      const requiredBook = parsedData.find((book) => {
        //usedd book to represent each individual data
        return book.id === Number(parsedAuthorAndId.id); //use return!!!!! Don't fucking forget!
      });
      console.log(JSON.stringify(requiredBook));
      requiredBook.author = parsedAuthorAndId.author;
      res.end(JSON.stringify(requiredBook));
    });
    //Use the below text to test the API, or don', i guess. It'll work either way. Just make sure to use double quotes.
    // {
    //     "id": "1",
    //     "author": "Obi Chidubem Michael"
    // }
  }

  if (req.url === "/books/author" && req.method === "POST") {
    const parsedData = books.books;
    const stringifiedData = JSON.stringify(parsedData);
    res.end(stringifiedData);
  }
});

server.listen(port, host_name, () => {
  console.log(`Server running on port ${port}`);
});
