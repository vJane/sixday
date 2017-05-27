'use strict'
const fs = require('fs-extra')

// Async with promises:
fs.copy('../../src/assets/perbg2.jpeg', '../images/1.jpeg')
  .then(() => console.log('success!'))
  .catch(err => console.error(err))

// Async with callbacks:
// fs.copy('/tmp/myfile', '/tmp/mynewfile', err => {
//   if (err) return console.error(err)
//   console.log('success!')
// })

// // Sync:
// try {
//   fs.copySync('/tmp/myfile', '/tmp/mynewfile')
//   console.log('success!')
// } catch (err) {
//   console.error(err)
// }