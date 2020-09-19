const path = require('path')
const fs = require('fs')

class TestNow {

    /**
     * 生成测试代码
     */
    getTestSource(methodName, classFile, isClass = false) {
        return `
test('${'TEST  ' + methodName}', () => {
    const ${isClass ? '{' + methodName + '}' : methodName} = require('${'../' + classFile}')
    const ret = ${methodName}()
    // expect(ret)
    //      .toBe('test ret')
})
        `
    }

    /**
     * @function 生成测试文件名
     * @param {string} fileName 文件名
     */
    getTestFileName(fileName) {
        const dirname = path.dirname(fileName)
        const extname = path.extname(fileName)
        const testName = path.basename(fileName, extname) + '.spec' + extname
        return path.format({
            root: dirname + '/__test__/',
            base: testName
        })
    }

    /**
     * 生成测试文件夹
     */
    genJestSource(sourcePath = path.resolve('./')) {
        const testPath = `${sourcePath}/__test__`
        if (!fs.existsSync(testPath)) {
            fs.mkdirSync(testPath)
        }

        // 遍历代码文件
        fs.readdirSync(sourcePath)
            // 添加完整路径
            .map(v => `${sourcePath}/${v}`)
            // 过滤文件
            .filter(path => fs.statSync(path).isFile())
            // 排除测试代码
            .filter(path => !/\.spec\./.test(path))
            .forEach(path => this.genTestFile(path))
    }

    genTestFile(filename) {
        const testFileName = this.getTestFileName(filename)


        // 判断此文件是否存在
        if (fs.existsSync(testFileName)) {
            return
        }

        const mode = require(filename)
        var source
        if (typeof mode === 'object') {
            source = Object.keys(mode)
                .map(item => this.getTestSource(item, path.basename(filename), true))
                .join('\n')
        } else if (typeof mode === 'function') {
            source = this.getTestSource(path.basename(filename, '.js'), path.basename(filename), false)
        }

        fs.writeFileSync(testFileName, source)
    }
}

module.exports = TestNow