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

