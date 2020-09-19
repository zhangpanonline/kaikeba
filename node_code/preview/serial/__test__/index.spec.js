const { callback, promise, generator, event } = require('../index')

// test('callback', done => {
//     callback()
//     setTimeout(done, 1000)
// })

// test('promise', done => {
//     promise()
//     setTimeout(done, 1000)
// })

// test('generator', done => {
//     generator()
//     setTimeout(done, 1000)
// })

test('event', done => {
    event()
    setTimeout(done, 1000)
})