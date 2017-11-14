const colors = require("./color"),
  readline = require('readline')
http = require('http')
API_KEY = "2a3605e7d7904edc909333c4a3ea1a92"

function init() {
  const msg = "请开始你的表演"
  Array.prototype.forEach.call(msg, function (it) {
    colors.pickColor("----------" + it + "----------")
  })

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let uid = '';
rl.question("> 敢问阁下尊姓大名：", (answer) => {
  uid = answer
  colors.pickColor('我知道啦~，你可以问我问题了哦！')
  chat()
});

function chat() {
  rl.question("> 向我提问吧~! :", (query) => {
    if(!query){
      colors.pickColor('亲爱的主人，请慢走~')
      process.exit(0)
    }
    let req = http.request({
      method: 'POST',
      hostname: 'www.tuling123.com',
      path: '/openapi/api',
      headers: {
        'Content-Type': 'application/json'
      },
    }, (res) => {
      let data = ""
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        colors.pickColor(handlData(data))
        chat()
      })
    })
    req.write(JSON.stringify({
      key: API_KEY,
      info: query,
      userid: uid
    }))
    req.end()
  })
}
function handlData(data){
  let info = JSON.parse(data)
  switch(info.code){
    case 100000:
    return info.text
    case 200000:
    return `${info.text}：${info.url}`
    case 302000:
    let news = `${info.text}:`
    info.list.forEach(function(it){
      news += `\n标题：${it.article}\n来源：${it.source}\n链接：${it.detailurl}`
    })
    return news
    default:
    return info.text
  }
}
}
module.exports = init