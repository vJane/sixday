'use stict'
const moment = require('moment');
const func = require('../sql/func');
const uuid = require('node-uuid');

function formatData(rows) {
    return rows.map(row => {
        const date = moment(row.create_time).format('YYYY-MM-DD');
        return Object.assign({}, row, {create_time: date});
    });
}


module.exports = {
    filter (req, res) {
        const key = req.body.key;
        const uid = req.body.uid;
        const sql = `SELECT diaries.id as id, maps.id as mid, photos.id as pid, src, context, temperature, longitude, latitude, address, diaries.created_at as created_at ` + 
        `FROM diaries LEFT JOIN maps ON diaries.mid = maps.id LEFT JOIN photos ON photos.did = diaries.id AND longitude = '${key[0]}' WHERE latitude = '${key[1]}' AND uid = '${uid}' ORDER BY diaries.created_at desc`;
        func.query(sql, result => {
            let rows = result.rows;
            rows = formatData(rows);
            res.json({code: 200, msg: rows});
        });
    },

    mapData(req, res) {
        const sql = 'select * from map_data';
        func.query(sql, result => {
            let rows = result.rows;
            rows = formatData(rows);
            res.json({code: 200, msg: rows[0]});
        })
    }
};