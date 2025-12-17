def is_valid_id(num_str):
  """
  can't have any repeats
  e.g 123123, 121212, 333, 11
  """
  min_slices = 2
  max_slices = len(num_str) + 1
  for num_repeats in range(min_slices, max_slices):
    # only want repeat #s that evenly divide the string
    if len(num_str) % num_repeats != 0:
      continue

    # split into n_repeats chunks
    chunks = []
    chunk_size = len(num_str) // num_repeats
    for i in range(0, len(num_str), chunk_size):
      chunks.append(num_str[i : i + chunk_size])

    # check if all are same (compare 1st with rest)
    all_same = True
    first_chunk = chunks[0]
    for chunk in chunks[1:]:
      if chunk != first_chunk:
        all_same = False
        break

    if all_same:
      return False

  return True


assert not is_valid_id('11')
assert not is_valid_id('22')
assert not is_valid_id('999')
assert not is_valid_id('1010')
assert not is_valid_id('222222')
assert not is_valid_id('38593859')
assert not is_valid_id('38593859')
assert not is_valid_id('824824824')
assert not is_valid_id('2121212121')
assert not is_valid_id('565656')
assert is_valid_id('837817')

if __name__ == '__main__':
  input_f = open('2025/d2_input.txt', 'r')
  data = input_f.read().strip().split(',')

  # parse into (a, b) tuples
  pairs = []
  for item in data:
    a, b = item.split('-')
    pairs.append((int(a), int(b)))

  invalid_sum = 0
  for pair in pairs:
    first, second = pair

    for n in range(first, second + 1):
      num_str = str(n)

      if not is_valid_id(num_str):
        invalid_sum += n

  print(invalid_sum)
