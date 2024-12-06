import re
input_data = open('2024d3_input.txt', 'r').read()
matches = re.findall(r'(?:(mul)\((\d+),(\d+)\)|(do)\(\)|(don\'t)\(\))', input_data)

enabled = True
out_enable_tot = 0
out_tot = 0

for match in matches:
  if match[4] == 'don\'t':
      enabled = False

  if match[3] == 'do':
      enabled = True

  if enabled and match[0] == 'mul':
      out_enable_tot += int(match[1]) * int(match[2])

  if match[0] == 'mul':
      out_tot += int(match[1]) * int(match[2])

print('part 1', out_tot)
print('part 2', out_enable_tot)