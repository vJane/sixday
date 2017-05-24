const https = require('https');
const uuid = require('node-uuid');

const corpid = 'wx5ca89ffbd7dae3cc';
const corpsecret = '7OtA4xOA97xbWdNWaSoKbCGUyFmC4QOwsNvbjlSrGCQN8jOaLG2uPeMWYYa-Y_t9';
module.exports = {
  weixinTicket (request, response) {
    getToken(corpid, corpsecret).then(token => {
      getTicket(token).then(ticket => {
        response.json({ code: 200, msg: ticket });
      }).catch(e => {
        response.json({ code: 500, msg: e });
      });
    }).catch(e => {
      response.json({ code: 500, msg: e });
    })
  },
}
function getToken(corpid, corpsecret) {
    const url = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${corpid}&corpsecret=${corpsecret}`
    return new Promise ((resolve, reject) => {
      https.get(url, (res) => {
        let datas = [];
        let size = 0;
        res.on('data', (data) => {
          datas.push(data);
          size += data.length;
        });
        res.on("end", () => {
          let buff = Buffer.concat(datas, size);  
          const access_token = JSON.parse(buff).access_token;
          resolve(access_token)
        })
      }).on('error', (e) => {
        reject(e);
      });
    })
  }

  function getTicket(access_token) {
    const url = `https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=${access_token}`;
    return new Promise ((resolve, reject) => {
      https.get(url, (res) => {
        let datas = [];
        let size = 0;
        res.on('data', (data) => {
          datas.push(data);
          size += data.length;
        });
        res.on("end", () => {
          let buff = Buffer.concat(datas, size);  
          const ticket = JSON.parse(buff).ticket;
          resolve(ticket);
        })
      }).on('error', (e) => {
        reject(e);
      })
    });
  }
