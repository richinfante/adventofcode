import fs from 'node:fs'

// read and process input
const input = fs.readFileSync('2024d1_input.txt', { encoding: 'utf8' })
const lists = input.split('\n').map(e => e.split('   '))
const list1 = []
const list2 = []

for (let i = 0; i < lists.length; i++) {
  list1.push(parseInt(lists[i][0]))
  list2.push(parseInt(lists[i][1]))
}

/**
 * part 1 - distance
 */
list1.sort((a, b) => a - b)
list2.sort((a, b) => a - b)

let sum = 0
for (let i = 0; i < list1.length; i++) {
  sum += Math.abs(list1[i] - list2[i])
}

console.log('Distance:', sum)

/**
 * part 2 - similarity score
 */
const used1 = {}
const used2 = {}

for (let i = 0; i < list1.length; i++) {
  if (!used1[list1[i]]) { used1[list1[i]] = 0 }
  if (!used2[list2[i]]) { used2[list2[i]] = 0 }

  used1[list1[i]] += 1
  used2[list2[i]] += 1
}

let simScore = 0
for (const num in used1) {
  if (used2[num]) {
    const sim = num * used2[num]
    // console.log(simScore, sim, num, used2[num])
    simScore += sim
  }
}

console.log('Similarity score:', simScore)