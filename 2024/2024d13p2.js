import fs from 'node:fs'

// let robots = fs.readFileSync('2024d13_test.txt', { encoding: 'utf8' }).split('\n')
// const BOARD_SIZE = { width: 11, height: 7, }
let robots = fs.readFileSync('2024d13_input.txt', { encoding: 'utf8' }).split('\n')
const BOARD_SIZE = { width: 101, height: 103 }
const NUM_TICKS = 1000000
let tick = 0

// load data
robots =robots.map(line => {
  const px = parseInt(line.split(' ')[0].split('=')[1].split(',')[0])
  const py = parseInt(line.split(' ')[0].split('=')[1].split(',')[1])

  const vx = parseInt(line.split(' ')[1].split('=')[1].split(',')[0])
  const vy = parseInt(line.split(' ')[1].split('=')[1].split(',')[1])

  return { px, py, vx, vy }
})

console.log(robots[0])

function printBoard () {
  let found = false
  for (let y = 0; y < BOARD_SIZE.height; y++) {
    let row = ''
    let consec = 0
    for (let x = 0; x < BOARD_SIZE.width; x++) {
      let count = 0
      for (let robot of robots) {
        if (robot.px === x && robot.py === y) {
          count++
        }
      }

      if (!count) {
        row += '.'
        consec = 0
      } else {
        consec++
        row += count
      }

      if (consec > 6) {
        console.log(tick)
        found = true
      }
    }

    console.log(row)
  }

  if (found) {
    console.log('found')
    process.exit(0)
  }
}

for (tick = 0; tick < NUM_TICKS; tick++) {
  console.log('tick', tick)
  printBoard()
  for (let robot of robots) {
    robot.px += (robot.vx % BOARD_SIZE.width)
    robot.py += (robot.vy % BOARD_SIZE.height)

    if (robot.px < 0) {
      robot.px = BOARD_SIZE.width + robot.px
    }

    if (robot.px >= BOARD_SIZE.width) {
      robot.px = robot.px - BOARD_SIZE.width
    }

    if (robot.py < 0) {
      robot.py = BOARD_SIZE.height + robot.py
    }

    if (robot.py >= BOARD_SIZE.height) {
      robot.py = robot.py - BOARD_SIZE.height
    }
  }
}

const counts = {
  q1: 0,
  q2: 0,
  q3: 0,
  q4: 0
}

console.log('midpoint', BOARD_SIZE.width / 2, BOARD_SIZE.height / 2)
let cx = Math.floor(BOARD_SIZE.width / 2)
let cy = Math.floor(BOARD_SIZE.height / 2)

for (let robot of robots) {
  if (robot.px < cx && robot.py < cy) {
    counts.q1++
    console.log('q1', robot.px, robot.py)
  }

  else if (robot.px > cx && robot.py < cy) {
    counts.q2++
    console.log('q2', robot.px, robot.py)
  }

  else if (robot.px < cx && robot.py > cy) {
    counts.q3++
    console.log('q3', robot.px, robot.py)
  }

  else if (robot.px > cx && robot.py > cy) {
    counts.q4++
    console.log('q4', robot.px, robot.py)
  } else {
    console.log('mid', robot.px, robot.py)
  }
}

console.log('counts', counts, 'robotCount', robots.length)
console.log('sec score', Object.values(counts).reduce((acc, val) => acc * val, 1))