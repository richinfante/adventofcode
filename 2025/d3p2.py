def find_max(iterable) -> tuple[int, int]:
  """Find max and max index in iterable"""
  max_val : int = 0
  max_idx : int = -1
  for idx, val in enumerate(iterable):
    if (max_val is None) or (val > max_val):
      max_val = val
      max_idx = idx

  if max_idx == -1:
    raise ValueError("Could not find max in iterable")

  return max_idx, max_val

def maximum_joltage(bank: list[int], batteries_to_activate: int = 2) -> int:
  """Find maximum joltage in battery bank"""

  digits = []
  last_idx = -1
  last_val = None

  for i in range(1, batteries_to_activate + 1):
    # slice from after the last, until the last possible digit
    # since we know we want to activate `n` batteries, can't look past end - n
    search_slice = bank[last_idx + 1:len(bank) - (batteries_to_activate - i)]

    # find max in slice
    idx, last_val = find_max(search_slice)

    # increment last idx
    last_idx += idx + 1

    # add to digits
    digits.append(last_val)

  assert len(digits) == batteries_to_activate

  # print maxes
  return int(''.join([str(x) for x in digits]))

def str_to_arr(string_in: str) -> list[int]:
  """convert a string into arr(int)"""
  return [int(x) for x in string_in]

if __name__ == "__main__":
  input_f = open("2025/d3_input.txt", "r")
  data = input_f.read().strip().split('\n')
  banks = [[int(x) for x in line] for line in data]

  # test cases
  assert maximum_joltage(str_to_arr('987654321111111'), 12) == 987654321111
  assert maximum_joltage([1,2,3,4,5], 3) == 345
  assert maximum_joltage([1,9,3,4,5], 3) == 945
  assert maximum_joltage([1,2,3,4,5]) == 45
  assert maximum_joltage([9,1,2,3,4,5]) == 95
  assert maximum_joltage([5,4,3,2,1]) == 54
  assert maximum_joltage([1,3,5,7,9]) == 79
  assert maximum_joltage([1,3,5,9,9]) == 99
  assert maximum_joltage([9,9,0,0,0,0]) == 99
  assert maximum_joltage([1,2,3,4,5,6,7,8], 8) == 12345678
  assert maximum_joltage([1,2,3,4,5,6,7,8], 4) == 5678

  # calculate total joltage
  total_joltage = 0
  for bank in banks:
    total_joltage += maximum_joltage(bank, batteries_to_activate=12)

  print('total joltage:', total_joltage)

