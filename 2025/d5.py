if __name__ == '__main__':
  input = open('d5_input.txt', 'r')
  ranges, items = input.read().split('\n\n')
  input.close()

  ranges = ranges.strip().split('\n')
  items = items.strip().split('\n')
  items = [int(x) for x in items]
  ranges = [tuple(int(y) for y in x.split('-')) for x in ranges]

  fresh_count = 0
  for item in items:
    for range in ranges:
      if range[0] <= item <= range[1]:
        fresh_count += 1
        break  # must break, it can be in multiple!

  print(fresh_count)
