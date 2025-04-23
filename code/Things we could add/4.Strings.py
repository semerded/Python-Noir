# You can add strings
greet = "Hello "
planet = "World"
message = greet + planet
print(message)

month = "June"
month[2] # == n (Starts counting at 0)
month[2-1] # == u (Math works on this too)
sentence = "I\'m sleepy"

len(month) # Length of the word

# Do we bother with the ASCII table????

sport = "Volleyball"
for letter in sport:
    print(f"{letter}")
print(F"weee")
for i in range(len(sport)):
    print(f"{i} {sport}")

print(sport[2:5])
print(sport[-8:-2])

if sport > sentence:
    print("sport is larger than sentence character wise") # Same with ints

if "y" in sport:
    print(f"There is a y in {sport}")

# string functions
print(
sport.capitalize(), "\n",
sport.lower(), "\n",
sport.upper(), "\n",
" a b ".strip(), "\n",
" a b ".lstrip(), "\n",
" a b ".rstrip(), "\n",
"cucumber".count("cu"), "\n",
sport.find("ey"), "\n",
sport.find("we"), "\n",
sport.replace("ball","plate"), "\n",
sport.isdigit(), "\n",
"123".isdigit()
)

# funky print methods
number = int(input('Enter a number: '))
print('Double of {} is {}'.format(number, number * 2))

number1 = 1/7
number2 = 342/7
score = 17/30
print('The first number: {:.5}'.format(number1))
print('The second number: {:.5}'.format(number2))
print('Your percentage: {:.2%}'.format(score))