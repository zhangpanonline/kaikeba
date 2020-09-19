const logTime = name => {
    console.log(`Log...${name} ` + new Date().getTime())
}

exports.callback = () => {
    setTimeout(() => {
        logTime('cb1')
        setTimeout(() => {
            logTime('cb2')
        }, 100)
    }, 100);
}

const promise = (name, delay = 100) => new Promise((resolve) => {
    setTimeout(() => {
        console.log(`Log...${name} ` + new Date().getTime())
        resolve()
    }, delay);
})

exports.promise = () => {
    promise('promise1')
        .then(promise('promise2'))
        .then(promise('promise3'))
}

function* generator(name) {
    yield promise(name + 1)
    yield promise(name + 2)
    yield promise(name + 3)
}

exports.generator = () => {
    let co = generator => {
        if (it = generator.next().value) {
            it.then(() => {
                co(generator)
            })
        }
    }
    co(generator('Co-Generator'))
}

// async await

// 采用事件驱动模式(事件监听)。任务的执行不取决于代码的顺序，而取决于某个事件是否发生

exports.event = () => {
    const asyncFn = name => event => {
        setTimeout(() => {
            logTime(name)
            event.emit('end')
        }, 100);
        return event
    }

    const ary = [
        asyncFn('event 1'),
        asyncFn('event 2'),
        asyncFn('event 3')
    ]

    const { EventEmitter } = require('events')
    const event = new EventEmitter()
    let i = 0
    event.on('end', () => i < ary.length && ary[i++](event))
    event.emit('end')
}