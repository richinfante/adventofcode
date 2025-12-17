def char_at(rows: list[list[str]], col: int, row: int) -> str:
  """Get the character at the specified column and row, returning '.' if out of bounds."""
  if row < 0 or row >= len(rows):
    return '.'

  if col < 0 or col >= len(rows[row]):
    return '.'

  return rows[row][col]

def find_beam_src(rows: list[list[str]]) -> tuple[int, int]:
  """Find the source of the tachyon beam in the grid."""
  for (y, row) in enumerate(rows):
    for (x, col) in enumerate(row):
      c = char_at(rows, x, y)

      if c == 'S':
        return (x, y)

  raise ValueError('Invalid Tachyon Beam')

if __name__ == "__main__":
  input_f= open('d7_input.txt', 'r')
  data = input_f.read().strip().split('\n')
  rows =[[x for x in r] for r in data]
  input_f.close()

  src = find_beam_src(rows)
  splits = 0

  for (y, row) in enumerate(rows):
    for (x, col) in enumerate(row):
      cur_cell = char_at(rows, x, y)
      above_cell = char_at(rows, x, y - 1)
      above_lhs = char_at(rows, x - 1, y - 1)
      above_rhs = char_at(rows, x + 1, y - 1)

      if above_cell == 'S':
        rows[y][x] = '|'

      elif cur_cell == '.' and above_cell == '|':
        rows[y][x] = '|'

      elif cur_cell == '^' and above_cell == '|':
        rows[y][x] = '*'
        splits += 1

      elif cur_cell == '.' and above_lhs == '*':
        rows[y][x] = '|'

      elif cur_cell == '.' and above_rhs == '*':
        rows[y][x] = '|'

  print('splits:', splits)
  print('n rows:', len(rows))

  # approach:
  # treat this like a DAG. Rather than trying to parse in-memory as a DAG, instead
  # just traverse the grid following the beam, and recording the weights line-by-line.
  #
  # store a weight of 1 on first row where beam starts
  # propagate weights downwards. Each node gets assigned a weight of the sum of it's parent's weights

  weights = {src: 1}
  for y in range(src[1] + 1, len(rows)):
    for x in range(len(rows[y])):
      cell = char_at(rows, x, y)
      above_cell = char_at(rows, x, y - 1)
      above_lhs = char_at(rows, x - 1, y - 1)
      above_rhs = char_at(rows, x + 1, y - 1)

      if cell == '|':
        # if a beam - there's three possibilities:
        # - it came straight down from above (if so, just take that weight, it'll be 0 if no beam there)
        # - it came from a lhs beam splitter (if so, check it is a splitter and add that weight)
        # - it came from a rhs beam splitter (if so, check it is a splitter and add that weight)

        # pull weight from above
        above_weight = weights.get((x, y - 1), 0)
        above_lhs_weight = weights.get((x - 1, y - 1), 0)
        above_rhs_weight = weights.get((x + 1, y - 1), 0)

        # add in lhs/rhs if they are splitters
        if above_rhs == '*':
          above_weight += above_rhs_weight

        if above_lhs == '*':
          above_weight += above_lhs_weight

        # assign weight
        weights[(x, y)] = above_weight

      # since the rows alternate - a splitter never goes directly into another splitter, there's always a pure beam line
      elif cell == '*':
        weights[(x, y)] = weights.get((x, y - 1), 0)

  # finally, sum up all weights on the last row
  last_y = len(rows) - 1
  total_paths = 0
  for x in range(len(rows[last_y])):
    total_paths += weights.get((x, last_y), 0)

  print('total paths:', total_paths)

