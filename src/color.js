const colorMap = {
  "red": "\x1B[31m",
  "green": "\x1B[32m",
  "yellow": "\x1B[33m",
  "blue": "\x1B[34m",
  "magenta": "\x1B[35m",
  "cyan": "\x1B[36m",
  "white": "\x1B[37m"
}
let arrColor = (function getColor(map){
 let result =[]
 Object.keys(map).forEach(function(it){
   result.push(map[it])
 })
 return result
})(colorMap)

 function getRancolor(arrColor){
   return arrColor[parseInt(Math.random()*arrColor.length)]
 }
module.exports={
  pickColor:function(...args){
     console.log(getRancolor(arrColor),...args)
  }
}
