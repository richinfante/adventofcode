import fs from 'fs'
const map = fs.readFileSync('2024d10_test2.txt', { encoding: 'utf8' }).split('\n').map(x => x.split('').map(el => {
  let val = parseInt(el)
  if (isNaN(val)) {
    return ' '
  }

  return val
}))
/// Helper function to get the value at a given coordinate, since x/y are swapped
function at(x, y) {
  return map[y]?.[x] ?? null
}

const trailheads = []

for (let x = 0; x < map[0].length; x++) {
  for (let y = 0; y < map.length; y++) {
    const current = at(x, y)

    if (current === 0) {
      trailheads.push({ x, y })
    }
  }
}

console.log('have', trailheads.length, 'trailheads')

let pathCount = 0
const peaks = {}

for (const trailhead of trailheads) {
  let explore = [{ x: trailhead.x, y: trailhead.y, trailhead, path: [trailhead] }]

  while (explore.length > 0) {
    const { x, y, trailhead, path } = explore.shift()
    const current = at(x, y)
    const left = at(x - 1, y)
    const right = at(x + 1, y)
    const up = at(x, y - 1)
    const down = at(x, y + 1)

    if (left && left == current + 1) {
      explore.push({ x: x - 1, y, trailhead })
    }

    if (right && right == current + 1) {
      explore.push({ x: x + 1, y, trailhead })
    }

    if (up && up == current + 1) {
      explore.push({ x, y: y - 1, trailhead })
    }

    if (down && down == current + 1) {
      explore.push({ x, y: y + 1, trailhead })
    }

    let trailhead_coord = `${trailhead.x},${trailhead.y}`
    if (!peaks[trailhead_coord]) {
      peaks[trailhead_coord] = []
    }

    if (left === 9 && current === 8) {
      let left_coord = `${x - 1},${y}`
      pathCount += 1
      if (!peaks[trailhead_coord].includes(left_coord)) {
        peaks[trailhead_coord].push(left_coord)
      }
    }

    if (right === 9 && current === 8) {
      let right_coord = `${x + 1},${y}`
      pathCount += 1
      if (!peaks[trailhead_coord].includes(right_coord)) {
        peaks[trailhead_coord].push(right_coord)
      }
    }

    if (up === 9 && current === 8) {
      pathCount += 1
      let up_coord = `${x},${y - 1}`
      if (!peaks[trailhead_coord].includes(up_coord)) {
        peaks[trailhead_coord].push(up_coord)
      }
    }

    if (down === 9 && current === 8) {
      let down_coord = `${x},${y + 1}`
      pathCount += 1
      if (!peaks[trailhead_coord].includes(down_coord)) {
        peaks[trailhead_coord].push(down_coord)
      }
    }
  }
}

console.log('sum trailhead scores:', Object.entries(peaks).reduce((acc, [key, value]) => {
  return acc + value.length
}, 0))

console.log('sum trailhead ratings:', pathCount)
