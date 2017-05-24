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
    register (req, res) {
        const id = uuid.v1();
        let sql = `INSERT INTO users (id, nickname, telephone, password, gender, birth, interest, description) VALUES 
        ('${id}', '${req.body.name}', '${req.body.phone}', '${req.body.password}', '${req.body.gender}', '${req.body.birth}', '{${req.body.interest}}', '${req.body.desc}')`;
        let sql2 = `SELECT * FROM users WHERE telephone = '${req.body.phone}'`;
        func.query(sql2, result => {
            if (result.rowCount === 0) {
                func.query(sql, result => {
                    if (result.rowCount === 1) {
                        res.json({code: 200, msg: id});
                    } else {
                        res.json({code: 500, msg: '注册失败，网络错误，请稍后重试！'});
                    }
                });
            } else {
                res.json({code: 500, msg: '注册失败，此用户已存在！'})
            }
        });
        
    },
    
    userInfo (req, res) {
        let id = req.body.uid;
        let sql = `SELECT * FROM users WHERE id = '${id}'`;
         func.query(sql, result => {
            let rows = result.rows;
            rows = formatData(rows);
            res.json({code: 200, msg: rows[0]});
        });
    },

    login (req, res) {
        let sql = `SELECT * FROM users WHERE telephone = '${req.body.phone}' AND password = '${req.body.password}'`;
        func.query(sql, result => {
            let rows = result.rows;
            rows = formatData(rows);
            res.json({code: 200, msg: rows[0]});
        });
    },

    uploadAvatar(req, res) {
        let sql = `UPDATE users SET portrait = '${req.body.imageUrl}' WHERE id = '${req.body.uid}'`;
        func.query(sql, result => {
            res.json({code: 200, msg: '上传头像成功！'})
        });
    },

    userModify(req, res) {
        let sql = `UPDATE users SET nickname = '${req.body.name}', telephone = '${req.body.phone}', 
        password = '${req.body.password}', gender = '${req.body.gender}', interest = '{${req.body.interest}}', 
        description = '${req.body.desc}' WHERE id = '${req.body.uid}'`;
        func.query(sql, result => {
            res.json({code: 200, msg: '修改个人资料成功！'})
        });
    }
};