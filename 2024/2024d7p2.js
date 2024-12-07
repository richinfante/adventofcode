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


// console.log(equations[1])
let validSolutions = []
let sum = 0
for (let eq = 0; eq < equations.length; eq++) {
  const equation = equations[eq]
  console.log('equation', eq, '/', equations.length)
  // brute force, yeah!
  const solutionCount = 3**(equation.terms.length-1)
  console.log(equation)
  console.log('solution count', solutionCount)

  // try all possible solutions
  for (let i = 0; i < solutionCount; i++) {
    let bin = i.toString(3).padStart(equation.terms.length - 1, '0')
    let answer = equation.terms[0]

    // apply the solution
    for (let j = 0; j < bin.length; j++) {
      if (bin[j] === '1') {
        answer *= equation.terms[j+1]
      } else if (bin[j] === '0') {
        answer += equation.terms[j+1]
      } else if (bin[j] === '2') {
        answer = parseInt(answer.toString() + equation.terms[j+1].toString())
      } else {
        throw new Error('invalid bin: ' + JSON.stringify(bin))
      }
    }

    // if answer is right, save it and break
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