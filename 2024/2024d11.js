import fs from 'node:fs'

// load data
const stones = fs.readFileSync('2024d11_input.txt', { encoding: 'utf8' })
  .split(' ').map(el => parseInt(el))

let updatesStones = stones
for (let i = 0; i < 25; i++) {
  updatesStones = updatesStones.flatMap((el) => {
    if (el === 0) {
      return [1]
    } else if (el.toString().length %2 === 0) {
      let str = el.toString()

      return [
        parseInt(str.substring(0, str.length / 2)),
        parseInt(str.substring(str.length / 2))
      ]
    } else {
      return [el * 2024]
    }
  })
}

console.log('stone count', updatesStones.length)