from typing import Optional

def get_at_x_y(grid, x: int, y: int) -> Optional[str]:
  if x < 0 or y < 0:
    return None

  if y >= len(grid) or x >= len(grid[0]):
    return None

  return grid[y][x]

def count_adjacent(x: int, y: int) -> int:
  count = 0
  for coords in [(-1, -1), (0, -1), (1, -1),
                 (-1, 0),          (1, 0),
                 (-1, 1),  (0, 1),  (1, 1)]:
    adj_x = x + coords[0]
    adj_y = y + coords[1]

    val = get_at_x_y(rows, adj_x, adj_y)
    # print(f"  checking {adj_x},{adj_y}: {val}")
    if val == '@':
      count += 1

  return count

if __name__ == "__main__":
  input_f = open("2025/d4_input.txt", "r")
  data = input_f.read().strip().split('\n')
  rows = [[x for x in line] for line in data]

  # print(rows)
  rm_count = 0
  for y in range(0, len(rows)):
    for x in range(0, len(rows[0])):
      cur = get_at_x_y(rows, x, y)
      if cur != '@':
        continue

      rmx = count_adjacent(x, y)
      # print(x, y, rmx)
      if rmx < 4:
        rm_count += 1

  print("removals:", rm_count)