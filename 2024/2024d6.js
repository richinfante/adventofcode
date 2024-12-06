import fs from 'node:fs'
const map = fs.readFileSync('2024d6_input.txt', { encoding: 'utf8' })
  .split('\n')
  .map(el => el.split(''))

let guardPos = undefined
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === '^') {
      guardPos = { x, y }
      break
    }
  }
}

while (true) {
  const current = map[guardPos.y][guardPos.x]

  if (current === '^') {
    if (guardPos.y === 0) {
      break
    } else {
      if (map[guardPos.y - 1][guardPos.x] === '#') {
        // turn
        map[guardPos.y][guardPos.x] = '>'
      } else {
        // move
        map[guardPos.y][guardPos.x] = 'X'
        map[guardPos.y - 1][guardPos.x] = '^'
        guardPos.y -= 1
      }
    }
  }

  else if (current === '>') {
    if (guardPos.x + 1 === map[0].length) {
      break
    } else {
      if (map[guardPos.y][guardPos.x + 1] === '#') {
        // turn
        map[guardPos.y][guardPos.x] = 'V'
      } else {
        // move
        map[guardPos.y][guardPos.x] = 'X'
        map[guardPos.y][guardPos.x + 1] = '>'
        guardPos.x += 1
      }
    }
  }

  else if (current === 'V') {
    if (guardPos.y + 1 === map.length) {
      break
    } else {
      if (map[guardPos.y + 1][guardPos.x] === '#') {
        // turn
        map[guardPos.y][guardPos.x] = '<'
      } else {
        // move
        map[guardPos.y][guardPos.x] = 'X'
        map[guardPos.y + 1][guardPos.x] = 'V'
        guardPos.y += 1
      }
    }
  }

  else if (current === '<') {
    if (guardPos.x === 0) {
      break
    } else {
      if (map[guardPos.y][guardPos.x - 1] === '#') {
        // turn
        map[guardPos.y][guardPos.x] = '^'
      } else {
        // move
        map[guardPos.y][guardPos.x] = 'X'
        map[guardPos.y][guardPos.x - 1] = '<'
        guardPos.x -= 1
      }
    }
  }

  // await new Promise(r => setTimeout(r, 500))
}

map[guardPos.y][guardPos.x] = 'X'
console.log(map.map(el => el.join('')).join('\n'))

// count number of X'es in map
let xCount = 0
for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[y].length; x++) {
    if (map[y][x] === 'X') {
      xCount += 1
    }
  }
}

console.log(xCount)