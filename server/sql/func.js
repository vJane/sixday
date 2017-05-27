'use strict'
const pg = require('pg');
const db = require('../configs/db');
const ResultSet = require('pg');
const uuid = require('node-uuid');
const Promise = require('promise');

const pool = new pg.Pool(db);

module.exports = {

    query(sql, cb) {
        pool.connect(function(err, client, done) {
            if (err) {
                console.log('error fetching client from pool', err);
            } else {
                client.query(sql, function(err, result) {
                    done();
                    if (err) {
                        console.log('error running query', err);
                    } else {
                        cb(result);
                    }
                });
            }
        });
        pool.on('error', function (err, client) {
            console.log('idle client error', err.message, err.stack);
        });
    }
};