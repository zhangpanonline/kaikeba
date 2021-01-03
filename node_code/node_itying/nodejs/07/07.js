const fs = require("fs");
const mkdirp = require("mkdirp"); // 支持一次生成多级目录
// 1. 判断服务器上面有没有upload目录，如果没有则创建这个目录，如果有的话不做操作(图片上传)
(function (path) {
  fs.stat(path, (err, stats) => {
    if (err) {
      mkdir(path);
    } else if (!stats.isDirectory()) {
      fs.unlink(path, (err) => {
        if (!err) {
          mkdir(path);
        } else {
          console.log(err);
        }
      });
    }
  });
})(__dirname + "/static/upload");

async function mkdir(path) {
  // fs.mkdir(path, (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  const res = await mkdirp(path);
  console.log("创建成功：", res);
}
// 2. wwwroot文件夹下面有images css js 以及 index.html,找出wwwroot 目录下面所有的目录，然后把他们放入数组中
// ① 递归实现
{
  const path = './wwwroot'
  const dirArr = []
  fs.readdir(path, (err, data) => {
    if (err) {
      console.log(err)
      return
    }

    (function getDir(i) {
      if (i == data.length) { // 执行完成
        console.log('success:', dirArr)
        return
      }

      fs.stat(path + '/' + data[i], (error, stats) => {
        if(stats.isDirectory()) {
          dirArr.push(data[i])
        }
        getDir(++i)
      })

    })(0)

  })
}
