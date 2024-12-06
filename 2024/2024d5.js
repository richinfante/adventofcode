import fs from 'node:fs'
const pages = fs.readFileSync('2024d5_pages.txt', { encoding: 'utf8' })
  .split('\n')
  .map(el => el.split(',').map(el => parseInt(el)))

const rules = fs.readFileSync('2024d5_rules.txt', { encoding: 'utf8' })
  .split('\n')
  .map(el => el.split('|').map(num => parseInt(num)))

// consume rules and create a dictionary for faster lookup, as part of sorting later on
// we'll use this as an input to js sort function
const rulesToDict = {}
for (const rule of rules) {
  if (!rulesToDict[rule[0]]) {
    rulesToDict[rule[0]] = {}
  }

  rulesToDict[rule[0]][rule[1]] = true
}

let sum = 0
let fixedSum = 0

for (const page of pages) {
  let pass = true
  let modified = [...page]

  // find which rules apply and if they are violated
  for (const rule of rules) {
    const i1 = page.indexOf(rule[0])
    const i2 = page.indexOf(rule[1])

    // if either of the rules are not present, skip
    if (i1 === -1 || i2 === -1) {
      continue
    }

    // if first page in rule is after the second page, it is a violation
    if (i1 > i2) {
      pass = false
      break
    }
  }

  if (pass) {
    // was passing, count middle page
    sum += page[parseInt(page.length / 2)]
  } else {
    // is failing, need to sort it
    modified.sort((a, b) => {
      if (rulesToDict[a] && rulesToDict[a][b]) {
        return -1
      }

      return 0
    })

    // count the sum of the fixed middle pages
    fixedSum += modified[parseInt(modified.length / 2)]
  }
}

console.log('Sum:', sum)
console.log('Fixed Sum:', fixedSum)
