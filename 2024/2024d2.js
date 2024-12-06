import fs from 'node:fs'
const data = fs.readFileSync('2024d2_input.txt', { encoding: 'utf8' })

const level_reports = data.split('\n').map(el => el.split(' ').map(el => parseInt(el)))
console.log(level_reports.length, 'input reports')

function getUnsafeIndex(series) {
  let seenDiff = null

  for (let j = 1; j < series.length; j++) {
  const diff = series[j] - series[j-1]

    if (Math.abs(diff) <  1 || Math.abs(diff) > 3) {
      // is unsafe
      return j
    }

    if (seenDiff === null) {
      seenDiff = diff
    } else {
      if (seenDiff < 0 && diff > 0) {
        return j
      } else if (seenDiff > 0 && diff < 0) {
        return j
      }
    }

  }
  return undefined
}

// main routine
let safe = 0
let safeWithDamping = 0
for (let i = 0; i < level_reports.length; i++) {
  const unsafeIndex = getUnsafeIndex(level_reports[i])
  if (unsafeIndex !== undefined) {

    // try random removal
    for (let rmi = 0; rmi < level_reports.length; rmi++) {
      const clone = [...level_reports[i]]
      clone.splice(rmi, 1)

      if (getUnsafeIndex(clone) === undefined) {
        safeWithDamping++
        break
      }
    }
  } else {
    safe++
  }
}

console.log('safe:', safe)
console.log('safe (With Damping):', safeWithDamping + safe)