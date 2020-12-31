const fs = require('fs')


/**
 * 以流的方式读取文件
 */
// const readStream = fs.createReadStream('./assets/input.txt');

// let count = 0;
// let str = ''
// readStream.on('data', data => {
//   str += data
//   ++count
// })

// readStream.on('end', _ => {
//   console.log(str)
//   console.log(count)
// })

// readStream.on('error', err => {
//   console.error(err)
// })


/**
 * 以流的方式写入文件
 */
const writeStream = fs.createWriteStream('./assets/output.txt')

let data = ''
for(let i = 0; i < 500; i++)  data += '导航模式'


writeStream.write(data, 'utf-8')

writeStream.end() // 标记写入完成

writeStream.on('finish', () => {
  console.log('写入完成')
})

writeStream.on('error', err => {
  console.error(err)
})