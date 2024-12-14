import fs from 'node:fs'

const A_COST = 3
const B_COST = 1

// load data
const data = fs.readFileSync('2024d12_input.txt', { encoding: 'utf8' })
let totalCost = 0

for (let line of data.split('\n\n')) {
  let params = line.split('\n')
  let cax = parseInt(params[0].split(' ')[2].split('+')[1].split(',')[0])
  let cay = parseInt(params[0].split(' ')[3].split('+')[1])
  let cbx = parseInt(params[1].split(' ')[2].split('+')[1].split(',')[0])
  let cby = parseInt(params[1].split(' ')[3].split('+')[1])
  let x = parseInt(params[2].split(' ')[1].split('=')[1].split(',')[0]) + 10000000000000
  let y = parseInt(params[2].split(' ')[2].split('=')[1]) + 10000000000000

  // darn floating point math! just round, and then we'll
  // check it's actually a solution later
  let b = Math.round((y - (cay/cax) * x) / (cby - ((cay * cbx) / cax)))
  let a = Math.round((x - b * cbx) / cax)

  // check if integer and positive solution
  if (parseInt(a) === a && parseInt(b) === b && a > 0 && b > 0) {
    // check this is a valid solution - if not, skip
    if (y !== a * cay + b * cby || x !== a * cax + b * cbx) {
      continue
    }

    // add to the total
    totalCost += a * A_COST + b * B_COST
  }
}

console.log('total cost', totalCost)