# Introduction of if statements

user = "sky"
password = "moonlight"

temperature = 20
cold = False
warm = True

# x == y
# x != y
# x < y
# x > y
# x <= y
# x >= y

if not cold:
    print("put on the AC")

if warm:
    print("also put on the AC")

length = 100

if length >= 90 and length <= 120:
    print(f"Big board")

if 90 <= length <= 120:
    print(f"Big board too")

if warm or cold:
    print(f"temperature is happening")

if password == "moonlight" or password == "wewo":
    print(f"password entered")

if password in ["moonlight", "wewo2"]:
    print(F"wewo3")

passEnter = input("what be password: ")
if passEnter == password:
    print(f"good password")
elif passEnter == "wewo":
    print(f"I like where you are thinking")
else:
    print(f"bad password")

if temperature % 2 == 0:
    print(f"{temperature} is even")
else:
    print(f"{temperature} is odd")

# Introducing match case
variable = int(input("Enter a number: "))
match variable:
    case 1:
        print(f"boo")
    case 2:
        print(f"wewo")
    case _:
        print(f"ultimate boo")