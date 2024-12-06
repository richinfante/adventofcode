import fs from 'node:fs'
const mapStr = fs.readFileSync('2024d6_input.txt', { encoding: 'utf8' })

function getIsCycle(mapStr, overrides = []) {
  const map = mapStr
    .split('\n')
    .map(el => el.split(''))

  for (const override of overrides) {
    map[override.y][override.x] = override.char
  }

  // console.log(map, overrides)

  let guardPos = undefined
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (['^', '>', 'V', '<'].includes(map[y][x])) {
        guardPos = { x, y }
        break
      }
    }
  }

  if (!guardPos) {
    console.log(overrides)
    throw new Error('No guard found')
  }

  const travelVecs = {}

  while (true) {
    const current = map[guardPos.y][guardPos.x]

    const coord = `${guardPos.x},${guardPos.y}`

    // init travelVecs[coord] if it doesn't exist
    if (travelVecs[coord] === undefined) {
      travelVecs[coord] = []
    }

    // if we've been here before facing the same direction, we're in a cycle
    if (!travelVecs[coord].includes(current)) {
      travelVecs[coord].push(current)
    } else {
      return true
    }

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
  }

  return false
}

const ogMap = mapStr
    .split('\n')
    .map(el => el.split(''))

const w = ogMap[0].length
const h = ogMap.length

let cycleCount = 0
for (let x = 0; x < w; x++) {
  for (let y = 0; y < h; y++) {
    if (ogMap[y][x] !== '.') {
      continue
    }

    if (getIsCycle(mapStr, [{ x, y, char: '#' }])) {
      cycleCount += 1
      console.log('cycle at', x, y)
    }
  }
}

console.log('places to add obstacles that cause cycles:', cycleCount)