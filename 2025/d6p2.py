def interperet_ceph_numbers(num_strs: list[str]) -> list[int]:
  """
    Return the list of integers represented by the ceph numbers in num_strs.
    use the padding present to determine the digits.
  """
  # columnwise, first #
  max_len = max(len(x) for x in num_strs)
  out_nums = [''] * (max_len)

  for i in range(max_len):
    for num_str in num_strs:
      out_nums[i] += num_str[i] if i < len(num_str) and num_str[i] != ' ' else ''

  return [int(x) for x in out_nums]

def find_all_space_cols(rows: list[list[str]]) -> list[int]:
  """
  Determine where all-space columns are in the grid.
  These split the problems
  """
  space_cols = []
  num_cols = len(rows[0])
  print('num cols:', num_cols)

  for col_idx in range(num_cols):
    all_space = True
    for row in rows:
      if row[col_idx] != ' ':
        all_space = False
        break
    if all_space:
      space_cols.append(col_idx)

  return space_cols

def split_by_space_cols(rows: list[list[str]], space_cols: list[int]) -> list[list[list[str]]]:
  split_rows = []
  prev_idx = 0

  for space_col in space_cols:
    split_part = []
    for row in rows:
      split_part.append(row[prev_idx:space_col])
    split_rows.append(split_part)
    prev_idx = space_col + 1  # +1 to skip space col

  # last part
  split_part = []
  for row in rows:
    split_part.append(row[prev_idx:])
  split_rows.append(split_part)

  return split_rows

if __name__ == '__main__':
  input = open('d6_input.txt', 'r')
  data = input.read().strip()
  input.close()

  rows = data.split('\n')
  row_items = []
  for i, r in enumerate(rows):
    if i < len(rows) - 1:
      row_items.append([x for x in r])
    else:
      row_items.append(r.split())

  assert interperet_ceph_numbers([['1', '2'], ['3', '4'], ['5', '6']]) == [135, 246]
  assert interperet_ceph_numbers([['6', '4'], ['2', '3'], ['3', '1', '4']]) == [623, 431, 4]
  assert interperet_ceph_numbers([['5', '1'], ['3', '8', '7'], ['2', '0', '4']]) == [532, 180, 74]
  assert interperet_ceph_numbers([[' ', '5', '1'], ['3', '8', '7'], ['2', '0', '4']]) == [32, 580, 174]

  number_rows, ops = row_items[:-1], row_items[-1]
  cols = list(zip(*number_rows))

  results = []
  space_cols = find_all_space_cols(number_rows)
  split_spaces = split_by_space_cols(number_rows, space_cols)

  for i, col in enumerate(split_spaces):
    this_col: list[int] = interperet_ceph_numbers(split_spaces[i])
    print(ops[i], this_col)

    if ops[i] == '+':
      results.append(sum(this_col))
    elif ops[i] == '*':
      prod = 1
      for x in this_col:
        prod *= x
      results.append(prod)
    else:
      raise ValueError(f'Unknown op {ops[i]}')

  print(sum(results))
