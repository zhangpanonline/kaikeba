function fn() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolve')
    }, 3000)
  })
}

(async function() {
  console.log(1)
  const res = await fn()
  console.log(res)
  console.log(2)
})()

// console.log('---------')
// console.log(1)
// fn().then(r => console.log(r))
// console.log(2)