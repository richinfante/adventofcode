def range_overlaps(r1, r2):
  if r1[1] < r2[0]:
    return False

  if r2[1] < r1[0]:
    return False

  return True


def split_overlapping(r1, r2) -> list[tuple[int, int]]:
  if not range_overlaps(r1, r2):
    return [r1, r2]

  start = min(r1[0], r2[0])
  end = max(r1[1], r2[1])

  return [(start, end)]


if __name__ == '__main__':
  input = open('d5_input.txt', 'r')
  ranges, _items = input.read().split('\n\n')
  input.close()

  ranges = ranges.strip().split('\n')
  ranges = [tuple(int(y) for y in x.split('-')) for x in ranges]

  processed_ranges: list[tuple[int, int]] = []

  assert range_overlaps((5, 10), (8, 12)) == True
  assert range_overlaps((5, 10), (1, 6)) == True
  assert range_overlaps((5, 10), (10, 15)) == True
  assert range_overlaps((5, 10), (1, 4)) == False
  assert range_overlaps((5, 10), (11, 15)) == False

  while True:
    has_overlaps = False

    for i, r1 in enumerate(ranges):
      for j, r2 in enumerate(ranges[i + 1 :], start=i + 1):
        if range_overlaps(r1, r2):
          new_ranges = split_overlapping(r1, r2)
          ranges.pop(j)
          ranges.pop(i)
          ranges.extend(new_ranges)
          has_overlaps = True
          break

    if not has_overlaps:
      break

  num_valid = 0
  for r1 in ranges:
    num_valid += r1[1] - r1[0] + 1  # +1 since inclusive

  print(num_valid)
