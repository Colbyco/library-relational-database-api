require('dotenv').config();
// const axios = require('axios');
const express = require('express');
const app = express();
const PORT = 3000;
const library = require('./library');
const ah = require('express-async-handler');

app.use(express.json());

// User Registeration
app.post('/register', async (req, res) => {
    // True = successful registration, False = Failed registration
    return res.send(await library.registerUser(req.body.username, req.body.password, req.body.email));
});

app.post('/login', async (req, res) => {
    // True = Successful login, False = Incorrect info
    const login = await library.loginUser(req.body.username, req.body.password);
    return res.send(login);
});

//

// Create

// POST - Author - /author - Creates an author with the given name
app.post(
    '/author',
    ah(async (req, res) => {
        return res.send(await library.createAuthor(req.body.authorName));
    }),
);

// POST - Book - /book/ - Creates a book with the given name, author_id, published_date, owned, or on_hand
app.post(
    '/book',
    ah(async (req, res) => {
        return res.send(await library.createBook(req.body));
    }),
);

// Read

// GET - Book - /books/{author_name}
app.get(
    '/books/author/:authorName',
    ah(async (req, res) => {
        const query = await library.getBooksByAuthor(req.params.authorName);

        if (query.length) {
            return res.send(query);
        }
        return res.sendStatus(404);
    }),
);

// GET - Book - /books/{title}
app.get(
    '/books/:title',
    ah(async (req, res) => {
        const query = await library.getBooksByTitle(req.params.title);

        if (query.length) {
            return res.send(query);
        }
        return res.sendStatus(404);
    }),
);

// GET - Author - /authors - return the entire authors table
app.get(
    '/authors',
    ah(async (req, res) => {
        const query = await library.getAuthors();

        if (query.length) {
            return res.send(query);
        }
        return res.sendStatus(404);
    }),
);

// GET - Book - /books - return the entire books table
app.get(
    '/books',
    ah(async (req, res) => {
        const query = await library.getBooks();

        if (query.length) {
            return res.send(query);
        }
        return res.sendStatus(404);
    }),
);

// GET - Author - /author/{author_id} - return the author with the given ID
app.get(
    '/author/:authorId',
    ah(async (req, res) => {
        const query = await library.findAuthor(await req.params.authorId);

        if (query.length) {
            return res.send(query);
        }
        return res.sendStatus(404);
    }),
);

// GET - Book - /book/{book_id} - Return the book with the given ID
app.get(
    '/book/:bookId',
    ah(async (req, res) => {
        const query = await library.findBook(req.params.bookId);

        if (query.length) {
            return res.send(query);
        }
        return res.sendStatus(404);
    }),
);

// Update

// PUT - Author - /author/{author_id} - Updates the author name with the given ID
app.put(
    '/author/:authorId',
    ah(async (req, res) => {
        const query = await library.updateAuthor(req.params.authorId, req.body.authorName);
        if (query.length) {
            return res.send(query);
        }
        return res.sendStatus(404);
    }),
);

// PUT - Book - /book/{book_id} - Updates the book details with the given ID
app.put(
    '/book/:bookId',
    ah(async (req, res) => {
        const query = await library.updateBook(req.params.bookId, req.body);
        if (query.length) {
            return res.send(query);
        }
        return res.sendStatus(404);
    }),
);

// Delete

// DELETE - Book - /book/{book_id} - Deletes the book of the given ID
app.delete(
    '/book/:bookId',
    ah(async (req, res) => {
        const query = await library.deleteBook(req.params.bookId);
        if (query.length) {
            return res.send(query);
        }
        return res.sendStatus(404);
    }),
);

app.listen(PORT, () => console.log('Server Started'));
