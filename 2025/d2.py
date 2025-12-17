def is_valid_id(num_str):
  is_valid_id = False
  for i in range(0, len(num_str) // 2):
    b_char = num_str[i]
    e_char = num_str[len(num_str) // 2 + i]
    if b_char != e_char:
      is_valid_id = True
      break

  return is_valid_id


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

      if len(num_str) % 2 != 0:
        continue

      if not is_valid_id(num_str):
        invalid_sum += n

  print(invalid_sum)
