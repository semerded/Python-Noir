# types
tuple = ()
list = []
setNDictionary = {}

temp = (30, 40, 10, 20)
# Tuples can't be changed
len(temp)
temp[1] # == 40
temp[-1] # == 20
# Will give error if out of range

films = ["speed racer", "jumanji", "hobbit","boo", "star wars"]
films[3] = "nightmare before christmas"
print(films)
len(films)
# Will give error if out of range
films.index("speed racer")

# Mutation of list

print(films)
films.append("Thor")
films.insert(2, "Aladdin")
films.remove("star wars")
films.pop(2)
films.sort()
films.index("jumanji")
films.count("speed racer")
print(films)
films.reverse()
print(films)


# Examples

weekdays = ("mon", "tue", "wed", "thu", "fri", "sat", "sun")
weekdays[2:5]
day = input('Enter a day: ')
if day in weekdays[0:5]:
    print('Weekday')
elif day in weekdays[5:]:
    print('Weekend')
else:
    print('Input not in series:', *weekdays)


new_film = input("Which movie would you like to add? ")
while not new_film in films:
    films.append(new_film)
print(new_film, "has been added. \nYour collection contains", len(films), "films.")
new_film = input("\nWhich movie would you like to add? ")

print("This film is already in your collection!")
print("Overview collection")
for film in films:
    print(film)

for i in range(len(weekdays)):
    print(weekdays[i])


index = 0
while index < len(weekdays):
    print(weekdays[index])
index += 1

for film in films:
    print(film)
for i in range(len(films)):
    print(films[i])
index = 0
while index < len(films):
    print(films[index])
index += 1

print('Before:', films)
for i in range(len(films)):
    films[i] = films[i].upper()
print('After:', films)
index = 0
while index < len(films):
    films[index] = 'Film ' + str(index + 1)
    index += 1
print('After while loop:', films)

r1 = (327, 419, 101, 667, 925, 225)
print(max(r1))
print(min(r1))
print(sum(r1))
r2 = [12.1, 7.5, 9.9, 11.4, 12.6]
print(max(r2))
print(min(r2))
print(sum(r2))
