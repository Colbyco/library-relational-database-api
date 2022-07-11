const db = require('./db');

async function searchByAuthor(input) {
    let response = await db.raw(`SELECT author_id FROM author WHERE author_name = ?`, [input] )
    let author_id = response.rows[0].author_id;
    response = await db.raw(`SELECT book_name FROM book WHERE author_id = ?`, [author_id])
    return response.rows
}

module.exports = {
    searchByAuthor
};  