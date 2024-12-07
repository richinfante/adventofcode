import fs from 'node:fs'
const equations = fs.readFileSync('2024d7_input.txt', { encoding: 'utf8' })
  .split('\n')
  .map(el => el.split(': '))
  .map(([answer, terms]) => {
    console.log(answer, '=', JSON.stringify(terms))
    let splitTerms = terms.split(' ')
    return {
      answer: parseInt(answer),
      terms: splitTerms.map(el => parseInt(el))
    }
  })

let validSolutions = []
let sum = 0
for (const equation of equations) {
  // brute force, yeah!
  const solutionCount = 2**(equation.terms.length-1)
  console.log(equation)
  console.log('solution count', solutionCount)
  for (let i = 0; i < solutionCount; i++) {
    let bin = i.toString(2).padStart(equation.terms.length - 1, '0')

    let answer = equation.terms[0]

    for (let j = 0; j < bin.length; j++) {
      if (bin[j] === '1') {
        answer *= equation.terms[j+1]
      } else if (bin[j] === '0') {
        answer += equation.terms[j+1]
      } else {
        throw new Error('invalid bin: ' + JSON.stringify(bin))
      }
    }

    // check for valid solution
    if (answer === equation.answer) {
      console.log('valid', equation, bin)
      validSolutions.push({ equation, bin })
      sum += equation.answer
      break
    }
  }
}

console.log('valid sum', sum)
console.log('num valid', validSolutions.length)