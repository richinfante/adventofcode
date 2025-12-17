def find_max(iterable) -> tuple[int, int]:
  """Find max and max index in iterable"""
  max_val: int = 0
  max_idx: int = -1
  for idx, val in enumerate(iterable):
    if (max_val is None) or (val > max_val):
      max_val = val
      max_idx = idx

  if max_idx == -1:
    raise ValueError('Could not find max in iterable')

  return max_idx, max_val


def maximum_joltage(bank) -> int:
  """Find maximum joltage in battery bank"""
  max_idx, max_val = find_max(bank)

  if max_idx == len(bank) - 1:
    # cannot use this max, trim and try again
    max_idx, max_val = find_max(bank[:max_idx])

  next_max = max(bank[max_idx + 1 : len(bank)])

  return int(str(max_val) + str(next_max))


if __name__ == '__main__':
  input_f = open('2025/d3_input.txt', 'r')
  data = input_f.read().strip().split('\n')
  banks = [[int(x) for x in line] for line in data]

  # test cases
  assert maximum_joltage([1, 2, 3, 4, 5]) == 45
  assert maximum_joltage([9, 1, 2, 3, 4, 5]) == 95
  assert maximum_joltage([5, 4, 3, 2, 1]) == 54
  assert maximum_joltage([1, 3, 5, 7, 9]) == 79
  assert maximum_joltage([1, 3, 5, 9, 9]) == 99

  # calculate total joltage
  total_joltage = 0
  for bank in banks:
    total_joltage += maximum_joltage(bank)

  print('total joltage:', total_joltage)
