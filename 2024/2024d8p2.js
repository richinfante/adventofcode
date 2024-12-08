import fs from 'node:fs'

// load equations into memory
const map = fs.readFileSync('2024d8_input.txt', { encoding: 'utf8' })
  .split('\n')
  .map(el => el.split(''))

const antennaPositions = {}

/// Helper function to get the value at a given coordinate, since x/y are swapped
function at(x, y) {
  return map[y]?.[x] ?? null
}

const w = map[0].length
const h = map.length

// find all antenna positions
for (let x = 0; x < w; x++) {
  for (let y = 0; y < h; y++) {
    const current = at(x, y)

    if (current === '.') { continue }

    if (!antennaPositions[current]) {
      antennaPositions[current] = []
    }

    antennaPositions[current].push({ x, y })
  }
}

const antinodes = {}

// find all anti nodes for each antenna pair with the same type
for (const [antenna, positions] of Object.entries(antennaPositions)) {
  // turn the list into a set of pairs
  const pairs = []
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      pairs.push([positions[i], positions[j]])
    }
  }

  // for each pair of antennas, create anti-nodes
  for (const [pos1, pos2] of pairs) {
    const {x: x1, y: y1} = pos1
    const {x: x2, y: y2} = pos2

    // we now apparently count antennas as anti-nodes also!
    antinodes[`${x1},${y1}`] = true
    antinodes[`${x2},${y2}`] = true

    const x_diff = x1 - x2
    const y_diff = y1 - y2

    // project the anti-nodes out from the antenna pair until we hit the edge of the map
    for (let r1 = 1;; r1++) {
      // create an anti-node on the map
      const antinode_1 = { x: x1 + x_diff * r1, y: y1 + y_diff * r1 }

      if (antinode_1.x < 0 || antinode_1.x >= w || antinode_1.y < 0 || antinode_1.y >= h) {
        // out of bounds
        break
      } else {
        // mark the anti-node on the map
        antinodes[`${antinode_1.x},${antinode_1.y}`] = true
        map[antinode_1.y][antinode_1.x] = '@'
      }
    }

    // opposite direction anti-node
    for (let r2 = 1;; r2++) {
      const antinode_2 = { x: x2 - x_diff * r2, y: y2 - y_diff * r2 }

      if (antinode_2.x < 0 || antinode_2.x >= w || antinode_2.y < 0 || antinode_2.y >= h) {
        // out of bounds
        break
      } else {
        // mark the anti-node on the map
        antinodes[`${antinode_2.x},${antinode_2.y}`] = true
        map[antinode_2.y][antinode_2.x] = '@'
      }
    }
  }
}

console.log(map.map(row => row.join('')).join('\n'))
console.log('antinode count', Object.keys(antinodes).length)