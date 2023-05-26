'use strict';
const db = require ('better-sqlite3');
const fs = require ('fs');
const sql = new db('database.sqlite');

let data = fs.readFileSync('database.sql', 'utf8');