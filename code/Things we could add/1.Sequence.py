# Starting on naming variables in different types

exampleInt = 32
exampleStr = "64"
exampleBool = False
exampleFloat = 34.2

# Conversions

int(exampleFloat)
int(exampleStr)
float(exampleInt)

str(exampleInt)
str(exampleFloat)
str(exampleBool)

# Basic print types and the fact that \n exists

print("Int: " + str(exampleInt))
print(f"String: {exampleStr}")

# Math

print( exampleInt / 10, "\n",
exampleInt // 10, "\n",
exampleFloat // 10, "\n",
exampleFloat // 10.0, "\n",
-exampleInt // 10, "\n",
exampleInt % 10 )

print(exampleInt * exampleFloat, "\n", exampleStr * 3)

exampleInt += 1 # and works with * (and strings)
print (exampleInt)

# input ?

name = input("Enter your name: ")
age = int(input("Enter your age: "))

print(f"Your names is {name} and your age is {age}")