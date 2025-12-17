from typing import Optional

EXPLORE_LIST = [(-1, -1), (0, -1), (1, -1), (-1, 0), (1, 0), (-1, 1), (0, 1), (1, 1)]


def get_at_x_y(grid, x: int, y: int) -> Optional[str]:
  if x < 0 or y < 0:
    return None

  if y >= len(grid) or x >= len(grid[0]):
    return None

  return grid[y][x]


def count_adjacent(x: int, y: int) -> int:
  """count adjacent @ symbols"""
  count = 0
  for coords in EXPLORE_LIST:
    adj_x = x + coords[0]
    adj_y = y + coords[1]

    val = get_at_x_y(rows, adj_x, adj_y)

    if val == '@':
      count += 1

  return count


if __name__ == '__main__':
  input_f = open('2025/d4_input.txt', 'r')
  data = input_f.read().strip().split('\n')
  rows = [[x for x in line] for line in data]

  # print(rows)
  rm_count = 0
  explore_queue = []

  # add all coords to explore queue
  for y in range(0, len(rows)):
    for x in range(0, len(rows[0])):
      explore_queue.append((x, y))

  # while there are coords to explore
  while len(explore_queue) > 0:
    x, y = explore_queue.pop(0)
    cur = get_at_x_y(rows, x, y)

    # ignore non-@ (not paper)
    if cur != '@':
      continue

    rmx = count_adjacent(x, y)

    # if neighbors < 4, remove and add neighbors to explore queue
    if rmx < 4:
      rm_count += 1
      rows[y][x] = '-'  # zero it out

      # add neighbors to explore queue
      for coords in EXPLORE_LIST:
        adj_x = x + coords[0]
        adj_y = y + coords[1]

        # only explore if it's an @
        if get_at_x_y(rows, adj_x, adj_y) == '@':
          explore_queue.append((adj_x, adj_y))

  print('removals:', rm_count)
