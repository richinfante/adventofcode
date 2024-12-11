import fs from 'node:fs'

// load data
const stones = fs.readFileSync('2024d11_input.txt', { encoding: 'utf8' }).split(' ')

// for part 2, define each stone as a (value, weight) pair
// this way, we can deduplicate the stones by incrementing the weight to avoid the exponential growth
.map(el => ({
  value: parseInt(el),
  weight: 1
}))

/**
 * Apply the transformation to a stone, returning array of new stones
 */
function runStep(el) {
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
}

let updatesStones = stones
for (let i = 0; i < 75; i++) {
  // apply the transform to each stone
  updatesStones = updatesStones.flatMap((el, idx) => {
    return runStep(el.value).map(newVal => ({
      value: newVal,
      weight: el.weight
    }))
  })

  // store first occurrence of each stone in the new array
  const used = {}

  // deduplicate the stones and set the weight to the sum of the weights
  for (const stone of updatesStones) {
    if (!used[stone.value]) {
      // add the first occurrence of the stone
      used[stone.value] = stone
    } else {
      //.if this stone is in the list, increment the weight of it by the weight of the current stone
      used[stone.value].weight += stone.weight
    }
  }

  updatesStones = Object.values(used)
}

// print the sum of the weights of the stones
// this would be equal to the length of the array if we didn't deduplicate
console.log('stone count', updatesStones.reduce((acc, el) => acc + el.weight, 0))