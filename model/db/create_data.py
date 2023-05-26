import sqlite3
import os
import random
import itertools
from datetime import datetime, timedelta

from faker import Faker
fake = Faker('el_GR')

random.seed(23)

path = os.path.dirname(os.path.abspath(__file__))
print(path)

# Delete database if exists
if os.path.exists(path+'/database.sqlite'):
    os.remove(path+'/database.sqlite')

# Connect to database
conn = sqlite3.connect(path+'/database.sqlite')
c = conn.cursor()

# Create tables
c.execute("""DROP TABLE IF EXISTS 'Team';""")
c.execute("""DROP TABLE IF EXISTS 'Player';""")
c.execute("""DROP TABLE IF EXISTS 'Match';""")
c.execute("""DROP TABLE IF EXISTS 'Match_day';""")
c.execute("""
CREATE TABLE 'Team' (
	'team_id' INTEGER PRIMARY KEY AUTOINCREMENT,
	'team_name' TEXT NOT NULL,
	'city' TEXT NOT NULL,
	'email' TEXT NOT NULL,
	'phone_num' TEXT NOT NULL,
	'website' TEXT NOT NULL,
	'stadium' TEXT NOT NULL,
	'stadium_address' TEXT NOT NULL,
	'team_name_short' TEXT NOT NULL
);""")

c.execute("""
CREATE TABLE 'Player' (
	'player_id' INTEGER PRIMARY KEY AUTOINCREMENT,
	'player_name' TEXT NOT NULL,
	'player_number' TEXT NOT NULL,
    'team_id' INTEGER NOT NULL,
	FOREIGN KEY('team_id') REFERENCES 'Team'('team_id') On Delete Cascade
);""")

c.execute("""
CREATE TABLE 'Match' (
	'match_id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'stadium' TEXT NOT NULL REFERENCES 'Team'('stadium') On Delete Cascade,
	'match_date' DATETIME NOT NULL,
	'home_score' INTEGER,
	'away_score' INTEGER,
    'home_team' INTEGER NOT NULL,
    'away_team' INTEGER NOT NULL,
    'match_day_id' INTEGER NOT NULL,
	FOREIGN KEY('home_team') REFERENCES 'Team'('team_id') On Delete Cascade,
	FOREIGN KEY('away_team') REFERENCES 'Team'('team_id') On Delete Cascade,
	FOREIGN KEY('match_day_id') REFERENCES 'Match_day'('id') On Delete Cascade
);""")

c.execute("""
CREATE TABLE 'Match_day' (
	'id' INTEGER PRIMARY KEY AUTOINCREMENT
);
""")
teams = ['Salonica Norths','Noor1 Reds', 'Green Last Believers',
         'New Philla Crabs','Patras Winners',
         'Salonica Elders',
         'Triple City Raiders','Volos Angels'
         ]
cities = ['Θεσσαλονίκη','Πειραιάς','Αθήνα','Νέα Φιλαδέλφια','Πάτρα','Θεσσαλονίκη','Τρίπολη','Βόλος']
names_small =['norths','reds','believers','crabs','winners','elders','raiders','angels']
stadiums = ['Mordor Arena','Narcos Arena','Botanikos Stadium','PROPAP Arena','Patras Stadium','West Stand','Morias Arena','Panthessaliko Stadium']
adresses = ["Μορδόρ 23","Νάρκος 23","Μποτανικός 23","Πρόπαπ 23","Πάτρα 23","Δυτική Θέση 23","Μοριάς 23","Πανθεσσαλικό 23"]
phone_numbers = ["2802009247",'2104986728','2107328327','2108751926','2920915966','2670502779','2710502779','2421095966']
for i in range(len(teams)):
    c.execute("INSERT INTO 'Team' VALUES(?,?,?,?,?,?,?,?,?) "
        ,(None,teams[i],cities[i],f"info@{names_small[i]}.gr",phone_numbers[i],
          f"{names_small[i]}.gr",stadiums[i],adresses[i],names_small[i]))

for i in range(1,161):
    if i < 21:
        c.execute("INSERT INTO 'Player' VALUES(?,?,?,?) "
            ,(None,fake.name_male(),random.randint(1,99),1))
    elif i < 41:
        c.execute("INSERT INTO 'Player' VALUES(?,?,?,?) ",
                  (None,fake.name_male(),random.randint(1,99),2))
    elif i < 61:
        c.execute("INSERT INTO 'Player' VALUES(?,?,?,?) ",
                  (None,fake.name_male(),random.randint(1,99),3))
    elif i < 81:
        c.execute("INSERT INTO 'Player' VALUES(?,?,?,?) ",
                  (None,fake.name_male(),random.randint(1,99),4))
    elif i < 101:
        c.execute("INSERT INTO 'Player' VALUES(?,?,?,?) ",
                  (None,fake.name_male(),random.randint(1,99),5))
    elif i < 121:
        c.execute("INSERT INTO 'Player' VALUES(?,?,?,?) ",
                  (None,fake.name_male(),random.randint(1,99),6))
    elif i < 141:
        c.execute("INSERT INTO 'Player' VALUES(?,?,?,?) ",
                  (None,fake.name_male(),random.randint(1,99),7))
    else:
        c.execute("INSERT INTO 'Player' VALUES(?,?,?,?) ",
                  (None,fake.name_male(),random.randint(1,99),8))

for i in range(1,15):
    c.execute("INSERT INTO 'Match_day' VALUES(?) "
              ,([None]))

def generate_rounds(teams, start_date, match_duration):
    num_teams = len(teams)
    half_teams = num_teams // 2
    schedule = []
    current_date = start_date

    for _ in range(num_teams - 1):
        matches = []

        for i in range(half_teams):
            match = (teams[i], teams[num_teams - 1 - i], current_date)
            matches.append(match)
            current_date += match_duration

        schedule.append(matches)
        teams.insert(1, teams.pop())
        current_date += timedelta(weeks=1)  # Increment date by one week for each round

    return schedule

def generate_double_round_robin(teams, start_date, match_duration):
    num_teams = len(teams)
    if num_teams % 2 != 0:
        teams.append("BYE")  # Add a dummy team if the number of teams is odd

    schedule = generate_rounds(teams, start_date, match_duration)
    reversed_schedule = [list(map(lambda m: (m[1], m[0], m[2] + match_duration), matches)) for matches in schedule]
    schedule.extend(reversed_schedule)

    return schedule
teams2 = ["1", "2", "3", "4", "5", "6", "7", "8"
         ]
start_date = datetime(2023, 6, 1, 14, 0)  # Example start date and time
match_duration = timedelta(hours=2)  # Example match duration

tournament_schedule = generate_double_round_robin(teams2, start_date, match_duration)
rounds = {}
# Print the tournament schedule
for i, round_matches in enumerate(tournament_schedule):
    print(f"Round {i+1}:")
    rounds[i+1] = []
    for match in round_matches:

        match_date_str = match[2].strftime("%Y-%m-%d %H:%M")  # Format match date as string
        rounds[i+1].append([match_date_str,match[0],match[1]])
        print(f"{match[0]} vs {match[1]} at {match_date_str}")
    print()
print(rounds)
def fetch_stadium(i):
    c.execute("""SELECT stadium FROM Team WHERE team_id = (?) """, (i))
    item = c.fetchone()
    return item[0]
for i in range(1,15):
    for j in range(4):
        c.execute("INSERT INTO 'Match' VALUES(?,?,?,?,?,?,?,?) "
          ,(None,fetch_stadium(rounds[i][j][1]),rounds[i][j][0],"2","1",rounds[i][j][1],rounds[i][j][2],i))

conn.commit()
# Close connection
conn.close()

print("Database created successfully")

