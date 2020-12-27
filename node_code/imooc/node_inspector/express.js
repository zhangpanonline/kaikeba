const express = require('express')
const app = new express()

app.get('/', (req, res) => {
    let num = 0
    while (num++ < 10**9) {
        
    }
    const newLocal = res.send('hello ' + num)
})
app.listen(3000, () => console.log('success !'))