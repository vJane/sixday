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
    // 获取日记列表
    fetchAll (req, res) {
        const sql = "SELECT diaries.id as id, maps.id as mid, photos.id as pid, src, context, temperature, longitude, latitude, address, diaries.created_at as created_at FROM diaries, maps, photos WHERE diaries.mid = maps.id AND diaries.id = photos.did ORDER BY diaries.created_at desc";
        func.query(sql, result => {
            let rows = result.rows;
            rows = formatData(rows);
            res.json({code: 200, msg: rows});
        });

    },
    
    //发布日记
    publish (req, res) {
        const id = uuid.v1();
        const id2 = uuid.v1();
        // if (req.body.diaryLocation) {
            let sql2 = `INSERT INTO maps (id, longitude, latitude, address) VALUES ('${id2}', '${req.body.diaryLocation.lng}', '${req.body.diaryLocation.lat}', '${req.body.diaryLocation.address}')`
            func.query(sql2, result => {
                let sql = `INSERT INTO diaries (id, context, temperature, uid, mid) VALUES ('${id}', '${req.body.diaryText}', '${req.body.diaryWeather}', '${req.body.uid}', '${id2}')`;
                func.query(sql, result => {
                    res.json({code: 200, msg: id});
                });
            });
        // }
    },

    // 获取日记详情
    fetchById (req, res) {
        let id = req.body.id;
        let sql = `SELECT * FROM diaries, maps, photos WHERE diaries.mid = maps.id AND diaries.id = photos.did AND diaries.id = '${id}'` ;
        func.query(sql, result => {
            rows = formatData(result.rows);
            res.json({code: 200, msg: rows[0]});
        });

    },

    filter (req, res) {
        let key = req.body.key;
        let sql = `SELECT diaries.id as id, maps.id as mid, photos.id as pid, src, context, temperature, longitude, latitude, address, diaries.created_at as created_at FROM diaries, maps, photos WHERE diaries.mid = maps.id AND photos.did = diaries.id AND context LIKE '%${key}%' ORDER BY diaries.created_at desc`;
        func.query(sql, result => {
            let rows = result.rows;
            rows = formatData(rows);
            res.json({code: 200, msg: rows});
        });
    },

    // 删除日记
    delete (req, res) {
        let id = req.body.did;
        let sql = `DELETE FROM diaries WHERE id = '${id}'`;
        func.query(sql, result => {
            res.send({code: 200, msg: '删除日记成功！'});
        });
    },

};