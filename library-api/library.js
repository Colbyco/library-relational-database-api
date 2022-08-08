const knex = require('./db');
const db = require('./db');
const { randomBytes } = require('crypto');

// Register User Account
async function registerUser(username, password, email) {
    const usernameQuery = await db('app_user').select('username').where({ username });
    const emailQuery = await db('app_user').select('email').where({ email });

    if (usernameQuery.length != 0 || emailQuery.length != 0) {
        return false;
    }

    const salt = generateSalt();
    const hashed_password = hash(password, salt) + ':' + salt;
    console.log(hashed_password);

    return await db('app_user').insert({ username, hashed_password, email });
}

function generateSalt() {
    return randomBytes(12).toString('hex');
}

function hash(password, salt) {
    return (
        (password + ':' + salt)
            .split('')
            .map(c => c.charCodeAt(0))
            .reduce((prev, curr) => prev + curr, 0) % 1000
    );
}

// Login User
async function loginUser(username, password) {
    await db('app_user').select('username').where({ username });
    let query = await db('app_user').select('hashed_password').where({ username });
    console.log(query);
    let splitArray = query[0].hashed_password.split(':');
    const databaseHash = splitArray[0];
    const salt = splitArray[1];
    const userHashedPassword = hash(password, salt);

    return userHashedPassword == databaseHash;
}

// Create
async function createAuthor(name) {
    return await db('author').insert({ name }).returning(['author_id', 'name']);
}

async function createBook({ title, author_id, published_date }) {
    return await db('book')
        .insert({ title, author_id, published_date })
        .returning(['title', 'author_id', 'published_date']);
}

// Read
async function getAuthors() {
    return await db('author').select('*');
}

async function getBooks() {
    return await db('book').select('*');
}

async function findAuthor(author_id) {
    return await db('author').select('name').where({ author_id });
}

async function findBook(book_id) {
    return await db('book').select('*').where({ book_id });
}

async function getBooksByAuthor(name) {
    return await db('book')
        .join('author', 'book.author_id', '=', 'author.author_id')
        .select('book_id', 'title', 'published_date', 'author.author_id', 'name')
        .where({ name });
}

async function getBooksByTitle(title) {
    return await db('book').select('book_id', 'title', 'published_date').where({ title });
}

// Update
async function updateAuthor(author_id, name) {
    return await db('author').update({ name }).where({ author_id }).returning(['author_id', 'name']);
}

async function updateBook({ title, author_id, published_date }) {
    return await db('book')
        .update({ title, author_id, published_date })
        .where({ book_id })
        .returning(['title', 'author_id', 'published_date']);
}

// Delete
async function deleteBook(book_id) {
    return await db('book').where({ book_id }).del().returning(['book_id', 'title', 'author_id', 'published_date']);
}

module.exports = {
    createAuthor,
    createBook,
    getAuthors,
    getBooks,
    findAuthor,
    findBook,
    updateAuthor,
    updateBook,
    deleteBook,
    registerUser,
    loginUser,
    getBooksByAuthor,
    getBooksByTitle,
};
