const fs = require('fs')
// test('测试文件名生成', () => {
//     const src = new (require('../index'))()
//     const ret = src.getTestFileName('/abc/class.js')
//     expect(ret)
//         .toBe('/abc/__test__/class.spec.js')
// })


// test('测试测试代码生成', () => {
//     const src = new (require('../index'))()
//     const ret = src.getTestSource('fun', 'class')
//     expect(ret)
//         .toBe(`
// test('TESTfun', () => {
//     const fun = require('../class')
//     const ret = fun()
//     // expect(ret)
//     //      .toBe('test ret')
// })
//         `)
// })

test('集成测试 测试生成测试代码文件', () => {
    // 准备环境
    // 删除测试文件
    fs.rmdirSync(__dirname + '/data/__test__', {
        recursive: true
    })

    const src = new (require('../index'))()
    src.genJestSource(__dirname + '/data')
})