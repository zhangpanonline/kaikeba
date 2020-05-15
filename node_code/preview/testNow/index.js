const path = require('path')
const fs = require('fs')
module.exports = class TestNow {

  // genJestSource(sourcePath = path.())

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
}