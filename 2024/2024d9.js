import fs from 'node:fs'

// load data
const map = fs.readFileSync('2024d9_input.txt', { encoding: 'utf8' }).split('')

const data = {}
const blocks = {}
let dataSize = 0
let blockid = 0

// process data blocks into memory
for (let i = 0; i < map.length; i+= 2) {
  // process data block
  let len = parseInt(map[i])
  const currentId = blockid++

  for (let cf = dataSize; cf < dataSize + len; cf++) {
    data[cf] = currentId
  }

  blocks[currentId] = len
  dataSize +=  len

  // whitespace block
  const ws_len = parseInt(map[i + 1])
  if (!isNaN(ws_len)) {
    for (let ws = dataSize; ws < dataSize + ws_len; ws++) {
      data[ws] = null
    }

    dataSize +=  ws_len
  }
}

// now, do the defrag
let defragStart = 0
let defragEnd = dataSize

// seek to the next whitespace block in the array
function seekNextWhiteSpace() {
  for (let i = defragStart; i < dataSize; i++) {
    if (data[i] === null) {
      defragStart = i
      return true
    }
  }

  return false
}

// seek to the last data block in the array
function seekLastData() {
  for (let i = dataSize; i >= 0; i--) {
    if (data[i] != null) {
      defragEnd = i
      return true
    }
  }

  return false
}

while (true) {
  seekLastData() // find the last data block
  seekNextWhiteSpace() // find the next whitespace block

  // stop once we intersect the pointers
  if (defragStart >= defragEnd) { break }

  // swap the block
  data[defragStart] = data[defragEnd]
  data[defragEnd] = null
}

// sum up the checksum
let sum = 0;
for (let i = 0; i < dataSize; i++) {
  sum += data[i] * i
}

console.log('checksum', sum)
