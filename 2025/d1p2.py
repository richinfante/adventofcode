input_f = open('2025/d1_input.txt', 'r')
lines = input_f.readlines()
input_f.close()

lines = [(x.strip()[0], int(x.strip()[1:])) for x in lines]

cur_pos = 50
password = 0
for ins in lines:
  original_pos = cur_pos

  new_pos = original_pos

  # hack, we could definitely math this out, but I won't bother
  for i in range(ins[1]):
    if ins[0] == 'R':
      new_pos = new_pos + 1
    else:
      new_pos = new_pos - 1

    if new_pos % 100 == 0:
      password += 1

  cur_pos = new_pos % 100

print(password)
