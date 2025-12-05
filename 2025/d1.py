input_f = open("2025/d1_input.txt", "r")
lines = input_f.readlines()
input_f.close()

lines = [(x.strip()[0], int(x.strip()[1:])) for x in lines]

start_pos = 50
password = 0

for ins in lines:
  if ins[0] == "R":
    new_pos = (start_pos + ins[1]) % 100
  else:
    new_pos = (start_pos - ins[1]) % 100

  if new_pos == 0:
    password += 1

  start_pos = new_pos

print(password)