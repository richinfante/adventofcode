if __name__ == '__main__':
  input = open('d6_input.txt', 'r')
  data = input.read().strip()
  input.close()

  rows = data.split('\n')
  row_items = []

  # parse each row into numbers/ops (ops on last row)
  for i, r in enumerate(rows):
    if i < len(rows) - 1:
      row_items.append([int(x) for x in r.split()])
    else:
      row_items.append(r.split())

  # parse the data for rows & ops
  num_rows, ops = row_items[:-1], row_items[-1]

  # simple zip/split to invert the rows into columns
  cols = list(zip(*num_rows))

  results = []

  # now that the data is structured, perform the operations
  for i, col in enumerate(cols):
    print(ops[i], col)

    if ops[i] == '+':
      results.append(sum(col))
    elif ops[i] == '*':
      prod = 1
      for x in col:
        prod *= x
      results.append(prod)
    else:
      raise ValueError(f'Unknown op {ops[i]}')

  print(sum(results))
