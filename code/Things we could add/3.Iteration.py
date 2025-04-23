# While loops
max= int(input("How many numbers do you want to add: "))
i = 0
while i <= max:
    # print(f"number: {i}")
    total += int(input(f"Enter a number {str(i+1)}: "))
    i += 1
print(f"Sum of the {i} numbers: {total}")

number = -1
total = 0
while number != 0:
    number = int(input("Enter a number: "))
    total += number
print(f"Sum: {total}")

# Range

range(2) # 0 1 2
range(2, 5) # 2 3 4
range(4, 11, 2) # 4 6 8 10
range(6, 3, -1) # 6 5 4

# for loop with range

i=0
number = int(input("Enter a number to multiply: "))

for i in range(1, 11):
    print(f"{i} X {number} = {i * number}")

for x in range(3, 5):
    for y in range(10, 50, 15):
        print(x, y)

count_numbers = int(input('How many numbers do you want to enter: '))
smallest = int(input("First number: "))
for i in range(count_numbers - 1):
    number = int(input('Next number: '))
    if number < smallest:
        smallest = number
print('The smallest number =', smallest)

for i in range(1, 8):
    print(i, '\t', end='')
    for j in range(1, i + 1):
        print(str(j), end='')
    print()

# End = " " it just adds a space at the end to add next to each other
# Print() is the same as \n