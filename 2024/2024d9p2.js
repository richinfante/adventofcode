import fs from 'node:fs'

// load data
const map = fs.readFileSync('2024d9_input.txt', { encoding: 'utf8' }).split('')

const data = {}
let dataSize = 0
const blocks = {}
let blockid = 0

// process data blocks into memory
for (let i = 0; i < map.length; i+= 2) {
  let len = parseInt(map[i])

  // data block
  const currentId = blockid++

  for (let cf = dataSize; cf < dataSize + len; cf++) {
    data[cf] = currentId
  }

  blocks[currentId] = {
    id: currentId,
    size: len,
    index: dataSize
  }

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
let blockCount = Object.keys(blocks).length
let blockToTry = blockCount - 1

while (true) {
  let defragStart = 0

  // current block to move
  let blockToMove = blocks[blockToTry--]

  if (!blockToMove) { break }

  // seek to next whitespace
  function seekNextWhiteSpace() {
    for (let i = defragStart; i < dataSize; i++) {
      if (data[i] === null) {
        defragStart = i
        return true
      }
    }

    return false
  }

  // get the free length
  while (defragStart < dataSize) {
    // seek to next whitespace
    seekNextWhiteSpace()

    // determine length of free space
    let freeLen = 0
    for (let i = defragStart; i < dataSize; i++) {
      if (data[i] === null) {
        freeLen++
      } else {
        break
      }
    }

    // if we can fit the block in the free space, break so we can move it
    if (blockToMove.size <= freeLen) {
      break
    } else {
      // if not, skip the free space and try again
      defragStart += freeLen
    }
  }

  // don't move block past its current position
  if (blockToMove.index < defragStart) {
    continue
  }

  // move the block
  for (let i = defragStart; i < defragStart + blockToMove.size; i++) {
    data[i] = blockToMove.id
  }

  // erase from old position
  for (let i = blockToMove.index; i < blockToMove.index + blockToMove.size; i++) {
    data[i] = null
  }

  // stop once we tried all blocks
  if (blockToTry < 0) {
    break
  }
}

// calculate checksum
let sum = 0;
for (let i = 0; i < dataSize; i++) {
  sum += data[i] * i
}

// console.log(data)
console.log('checksum', sum)
