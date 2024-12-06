import fs from 'node:fs'
const input = fs.readFileSync('2024d4_input.txt', { encoding: 'utf8' })

const grid = input.split('\n').map(row => row.split(''))

let found = 0;
const findString = 'XMAS'

for (let rowid = 0; rowid < grid.length; rowid++) {
  const row = grid[rowid]
  for (let colid = 0; colid < grid[rowid].length; colid++) {
    const char = grid[rowid][colid]
    if (char === findString[0]) {
      // grab the potential matches in all directions
      // don't really care about undefined values, since those aren't equal to search
      let fwdStr = row.slice(colid, colid+findString.length).join('')
      let backStr = row.slice(colid-findString.length+1, colid+1).reverse().join('')
      let vertStr = [rowid, rowid-1, rowid-2, rowid-3].map(el => grid[el] ? grid[el][colid] : '').join('')
      let downStr = [rowid, rowid+1, rowid+2, rowid+3].map(el => grid[el] ? grid[el][colid] : '').join('')
      let diagUpUp = grid[rowid]?.[colid] + grid[rowid+1]?.[colid+1] + grid[rowid+2]?.[colid+2] + grid[rowid+3]?.[colid+3]
      let diagDnUp = grid[rowid]?.[colid] + grid[rowid-1]?.[colid+1] + grid[rowid-2]?.[colid+2] + grid[rowid-3]?.[colid+3]
      let diagUpDn = grid[rowid]?.[colid] + grid[rowid+1]?.[colid-1] + grid[rowid+2]?.[colid-2] + grid[rowid+3]?.[colid-3]
      let diagDnDn = grid[rowid]?.[colid] + grid[rowid-1]?.[colid-1] + grid[rowid-2]?.[colid-2] + grid[rowid-3]?.[colid-3]

      // gather all potential matches and count them
      const potential = [fwdStr, backStr, vertStr, downStr, diagUpUp, diagDnUp, diagUpDn, diagDnDn]

      // count the number of matches
      for (const item of potential) {
        if (item === findString) {
          found++
        }
      }
    }
  }
}

console.log('XMAS count', found)

let foundmas = 0
for (let rowid = 0; rowid < grid.length; rowid++) {
  for (let colid = 0; colid < grid[rowid].length; colid++) {
    const char = grid[rowid][colid]
    if (char === 'A') {
      // grab X pattern centered around current
      // some of these might be 'undefined' but that's fine - they won't match
      let diag1 = grid[rowid-1]?.[colid+1] + grid[rowid]?.[colid] + grid[rowid+1]?.[colid-1]
      let diag2 = grid[rowid-1]?.[colid-1] + grid[rowid]?.[colid] + grid[rowid+1]?.[colid+1]

      // find reversals
      const diag1rev = diag1.split('').reverse().join('')
      const diag2rev = diag2.split('').reverse().join('')

      // allow matches to be reversed or not
      if ((diag1 === 'MAS' || diag1rev === 'MAS') && (diag2 === 'MAS' || diag2rev === 'MAS')) {
        foundmas++
      }
    }
  }
}

console.log('Found X-MAS', foundmas)