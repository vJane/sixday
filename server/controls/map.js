let moment = require('moment');
let func = require('../sql/func');
let uuid = require('node-uuid');

function formatData(rows) {
    return rows.map(row => {
        let date = moment(row.create_time).format('YYYY-MM-DD');
        return Object.assign({}, row, {create_time: date});
    });
}


module.exports = {
    filter (req, res) {
        let key = req.body.key;
        let sql = `SELECT diaries.id as id, maps.id as mid, photos.id as pid, src, context, temperature, longitude, latitude, address, diaries.created_at as created_at FROM diaries, maps, photos WHERE diaries.mid = maps.id AND photos.did = diaries.id AND longitude = '${key[0]}' AND latitude = '${key[1]}' ORDER BY diaries.created_at desc`;
        func.query(sql, result => {
            let rows = result.rows;
            rows = formatData(rows);
            res.json({code: 200, msg: rows});
        });
    },
};