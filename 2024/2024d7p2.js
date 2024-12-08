import fs from 'node:fs'

// load equations into memory
const equations = fs.readFileSync('2024d7_input.txt', { encoding: 'utf8' })
  .split('\n')
  .map(el => el.split(': '))
  .map(([answer, terms]) => {
    let splitTerms = terms.split(' ')
    return {
      answer: parseInt(answer),
      terms: splitTerms.map(el => parseInt(el))
    }
  })


let validSolutions = []
let sum = 0

// for each equation, try all possible solutions
for (let eq = 0; eq < equations.length; eq++) {
  const equation = equations[eq]
  process.stdout.write('.')
  // brute force, yeah!
  const solutionCount = 3**(equation.terms.length-1)

  // try all possible solutions
  for (let i = 0; i < solutionCount; i++) {
    let trits = i.toString(3).padStart(equation.terms.length - 1, '0')
    let answer = equation.terms[0]

    // apply the solution
    for (let j = 0; j < trits.length; j++) {
      if (trits[j] === '0') {
        answer += equation.terms[j+1]
      } else if (trits[j] === '1') {
        answer *= equation.terms[j+1]
      } else if (trits[j] === '2') {
        answer = parseInt(answer.toString() + equation.terms[j+1].toString())
      } else {
        throw new Error('invalid string: ' + JSON.stringify(trits))
      }
    }

    // if answer is right, save it and break
    if (answer === equation.answer) {
      validSolutions.push({ equation, bin: trits })
      sum += equation.answer
      break
    }
  }
}

console.log()
console.log('valid sum', sum)
console.log('num valid', validSolutions.length)