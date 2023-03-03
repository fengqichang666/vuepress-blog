const fs = require('fs')
const dir = __dirname
const files = fs.readdirSync(dir)
let fileName = []
for (file of files) {
    if(file.indexOf('.md')>-1&&file.indexOf('README')===-1){
        fileName.push(encodeURI(file.substring(0, file.length - 3)))
    }
}
module.exports = fileName