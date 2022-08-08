/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.raw(`
        CREATE TABLE inventory (
            inventory_id serial primary key not null,
            checked_out_at timestamp,
            book_id int not null,
            foreign key (book_id) references book(book_id),
            user_id int,
            foreign key (user_id) references app_user(user_id)
        )
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.raw(`DROP TABLE inventory`);
};
