'use strict';

const db = require('better-sqlite3');
const fs = require('fs');
const bcrypt = require('bcrypt');
const sql = new db('./model/db/database.sqlite');

let data = fs.readFileSync('./model/db/database.sql', 'utf8');

data = data.split(';');

for (let i of data) {

    if (i === "") {
        continue;
    }
    let stmt = sql.prepare(i + ';');
    stmt.run();
}

