const path = require('path')
const fs = require('fs')
module.exports = class TestNow {

  /** 
  * 生成测试文件名
  * @param {string} filename 代码文件名
  */
  getTestFileName(filename) { // /abc/index.js
    const dirName = path.dirname(filename) // /abc
    const baseName = path.basename(filename) // index.js
    const extName = path.extname(filename) // .js
    const testName = baseName.replace(extName, `.spec${extName}`) // index.spec.js
    return path.format({
      root: dirName + '/__test__/',
      base: testName
    })
  }

  /**
   * 生成测试代码
   */
  getTestSource(methodName, classFile, isClass = false) {
    console.log('getTestSource:', methodName)
    return `
test('${'TEST ' + methodName }', () => {
  const ${isClass ? '{' + methodName + '}' : methodName } = require('${'../' + classFile}')
  const ret = ${methodName}()
  // expect(ret)
  //    .toBe('test return')
})
    `
  }

  genJestSource(sourcePath = path.resolve('./')) {
    if (!fs.existsSync(`${sourcePath}/__test__`)) {
      fs.mkdirSync(`${sourcePath}/__test__`)
    }

    // 遍历代码文件
    let list = fs.readdirSync(sourcePath)
    list
      // 添加完整路径
      .map(v => `${sourcePath}/${v}`)
      // 过滤文件
      .filter(v => fs.statSync(v).isFile())
      // 排除测试代码
      .filter(v => !v.includes('.spec'))
      .map(v => this.genTestFile(v))
  }

  genTestFile(filename) {
    console.log('filename: ' + filename)
    const testFileName = this.getTestFileName(filename)

    // 判断测试文件是否存在
    if (fs.existsSync(testFileName)) return

    const mod = require(filename)
    let source
    if (this.getDataType(mod, 'object')) {
      source = Object.keys(mod)
        .map(v => this.getTestSource(v, path.basename(filename), true))
    } else if (this.getDataType(mod, 'function')) {
      const basename = path.basename(filename)
      source = this.getTestSource(basename.replace('.js', ''), basename, false)
    }
    fs.writeFileSync(testFileName, source)
  }

  getDataType(data, type = null) {
    let res = Object.prototype.toString.call(data)
    res = res.slice(8, res.length - 1).toLocaleLowerCase()
    return type ? (type.toLocaleLowerCase() === res) : res
  }

}