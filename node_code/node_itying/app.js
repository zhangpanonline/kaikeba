console.log("=============================");
const http = require("http");
const url = require("url");
const fs = require("fs");
{
  const api = "http://www.baidu.com?name=zhangsan&age=30";
  // console.log(url.parse(api, true).query.name)
}
{
  // 完全符合CommonJs规范的包目录一般包含如下这些文件
  // package.json 包描述文件
  // bin 用于存放可行性二进制文件的目录
  // lib 用于存放JavaScript代码的目录
  // doc 用于存放文档的目录
  // npm list 查看当前目录下已安装的包
  // npm info packageName 查看安装包的信息
  // * 表示全部取最新
  // ^ 表示第一位版本号不变
  // ~ 表示前两位不变
  // 什么都没有，表示指定版本，不更新
}
{
  /**
   * 1. fs.stat 检测是文件还是目录
   * 2. fs.mkdir 创建目录
   * 3. fs.writeFile 创建写入文件,会覆盖上次创建的文件
   * 4. fs.appendFile 追加文件,没有则会创建
   * 5. fs.readFile 读取文件
   * 6. fs.readdir 读取目录
   * 7. fs.rename 功能：1.重命名 2.移动文件
   * 8. fs.rmdir 删除目录
   * 9. fs.unlink 删除文件
   */
  //   fs.stat("./app.js", (err, stats) => {
  //     if (err) console.log(err);
  //     console.log(stats);
  //     console.log(`是文件：${stats.isFile()}`);
  //     console.log(`是目录：${stats.isDirectory()}`);
  //   });
  /**
   * @name 创建目录
   * path 将创建的目录路径
   * mode 目录权限（默认读写权限），默认777
   * callback 回调，传递异常参数err
   */
  //   fs.mkdir("./css", (err) => {
  //     if (err) console.log(err);
  //   });
  /**
   * @name 创建写入文件，有则覆盖
   * @param {string} 文件名称
   * @param {String|Buffer} 写入的内容
   * @param {Object} option数组对象
   * @param {Function} 回调，传递一个异常参数
   */
  //   fs.writeFile("./index.html", new Date(), (err) => {
  //     if (err) console.log(err);
  //   });
  //   fs.appendFile("./index.html", new Date().getMilliseconds() + "||", (err) => {
  //     if (err) console.log(err);
  //   });
  //   fs.readFile("./index.html", (err, data) => {
  //     if (err) console.log(err); // no such file or directory
  //     console.log(data, data.toString());
  //   });
  //   fs.readdir("./demo1", (err, data) => {
  //     if (err) console.log(err);
  //     console.log(data);
  //   });
  //   fs.rename("./demo1/bbb.html", "./index.html", (err) => {
  //     if (err) console.log(err);
  //   });
  //   fs.unlink("./aaa/index.html", (err) => {
  //     if (err) console.log(err);
  //   });
  //   fs.rmdir("./aaa", (err) => {
  //     if (err) console.log(err);
  //   });
}
