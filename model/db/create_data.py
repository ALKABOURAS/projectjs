import sqlite3
import os
import random
import bcrypt
from itertools import combinations
from datetime import datetime, timedelta

from faker import Faker

fake = Faker('el_GR')

random.seed(4563332)

path = os.path.dirname(os.path.abspath(__file__))
print(path)

# Delete database if exists
if os.path.exists(path + '/database.sqlite'):
    os.remove(path + '/database.sqlite')

# Connect to database
conn = sqlite3.connect(path + '/database.sqlite')
c = conn.cursor()

# Create tables
c.execute("""DROP TABLE IF EXISTS 'Team';""")
c.execute("""DROP TABLE IF EXISTS 'Player';""")
c.execute("""DROP TABLE IF EXISTS 'Match';""")
c.execute("""DROP TABLE IF EXISTS 'Match_day';""")
c.execute("""DROP TABLE IF EXISTS 'Standings';""")
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
	'team_name_short' TEXT NOT NULL,
	'stad_name_short' TEXT NOT NULL,
	'team_bg' TEXT NOT NULL,
	'year' TEXT NOT NULL  
);""")

c.execute("""
CREATE TABLE 'Player' (
	'player_id' INTEGER PRIMARY KEY AUTOINCREMENT,
	'player_name' TEXT NOT NULL,
	'player_surname' TEXT NOT NULL,
	'player_number' TEXT NOT NULL,
    'team_id' INTEGER NOT NULL,
    'player_position' TEXT NOT NULL,
	FOREIGN KEY('team_id') REFERENCES 'Team'('team_id') On Delete Cascade
);""")

c.execute("""DROP TABLE IF EXISTS 'user';""")
c.execute("""
CREATE TABLE IF NOT EXISTS 'user' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'username' TEXT NOT NULL,
  'password' TEXT NOT NULL
);
""")
password1 = bcrypt.hashpw('admin'.encode('utf-8'), bcrypt.gensalt())


c.execute("""DROP TABLE IF EXISTS 'announcements';""")
c.execute("""
CREATE TABLE IF NOT EXISTS 'announcements' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'title' TEXT NOT NULL,
  'content' TEXT NOT NULL,
  'link' TEXT NOT NULL
);
""")
c.execute("""DROP TABLE IF EXISTS 'messages';""")
c.execute("""
CREATE TABLE IF NOT EXISTS 'messages' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'name' TEXT NOT NULL,
  'surname' TEXT NOT NULL,
  'email' TEXT NOT NULL,
    'message' TEXT NOT NULL,
    'company' TEXT NOT NULL
);
""")


def generate_fake_article():
    title = fake.catch_phrase()
    content = fake.paragraphs(nb=3)

    c.execute("""
    insert into announcements (title, content, link) values (?, ?, ?);
    """, (title, ' '.join(content), title[0:2].lower().replace(' ', '-')))


c.execute(
    "insert into 'user' values (?,?, ?);", (None,'admin', password1))


for i in range(6):
    fake_article = generate_fake_article()


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
# create table STANDINGS
c.execute("""
CREATE TABLE 'Standings' (
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'position' INTEGER NOT NULL,
    'team_id' INTEGER NOT NULL,
    'points' INTEGER NOT NULL,
    'goals_for' INTEGER NOT NULL,
    'goals_against' INTEGER NOT NULL,
    'goals_difference' INTEGER NOT NULL,
    'wins' INTEGER NOT NULL,
    'draws' INTEGER NOT NULL,
    'loses' INTEGER NOT NULL,
    'played' INTEGER NOT NULL,
    FOREIGN KEY('team_id') REFERENCES 'Team'('team_id') On Delete Cascade
);
""")

teams = ['Salonica Norths', 'Noor1 Reds', 'Green Last Believers',
         'New Philla Crabs', 'Patras Winners',
         'Salonica Elders',
         'Triple City Raiders', 'Volos Angels'
         ]
cities = ['Θεσσαλονίκη', 'Πειραιάς', 'Αθήνα', 'Νέα Φιλαδέλφια', 'Πάτρα', 'Θεσσαλονίκη', 'Τρίπολη', 'Βόλος']
names_small = ['norths', 'reds', 'greens', 'crabs', 'winners', 'elders', 'raiders', 'angels']
stadiums = ['Mordor Arena', 'Narcos Arena', 'Botanikos Stadium', 'PROPAP Arena', 'Patras Stadium', 'West Stand',
            'Morias Arena', 'Panthessaliko Stadium']
adresses = ["Μορδόρ 23", "Νάρκος 23", "Μποτανικός 23", "Πρόπαπ 23", "Πάτρα 23", "Δυτική Θέση 23", "Μοριάς 23",
            "Πανθεσσαλικό 23"]
phone_numbers = ["2802009247", '2104986728', '2107328327', '2108751926', '2920915966', '2670502779', '2710502779',
                 '2421095966']
stad_names_small = ['toumpa', 'narcos', 'botanikos', 'propap', 'patras', 'elders', 'morias', 'volos']
team_bg = ['#1E1E1E', '#D31313', '#24A83C', '#BAAC13', '#980100', '#007AFF', '#215E97', '#C2D1D9']
year_founded = ['1926', '1925', '1908', '1924', '1891', '1908', '1931', '1924']
for i in range(len(teams)):
    c.execute("INSERT INTO 'Team' VALUES(?,?,?,?,?,?,?,?,?,?,?,?) "
              , (None, teams[i], cities[i], f"info@{names_small[i]}.gr", phone_numbers[i],
                 f"{names_small[i]}.gr", stadiums[i], adresses[i], names_small[i], stad_names_small[i], team_bg[i],
                 year_founded[i]))

for i in range(1, 9):
    for j in range(0, 20):
        if j < 3:
            names = fake.name_male().split(' ')
            c.execute("INSERT INTO 'Player' VALUES(?,?,?,?,?,?) "
                      , (None, names[0], names[1], random.randint(1, 99), i, 'Τερματοφύλακας'))
        elif j < 9:
            names = fake.name_male().split(' ')
            c.execute("INSERT INTO 'Player' VALUES(?,?,?,?,?,?) "
                      , (None, names[0], names[1], random.randint(1, 99), i, 'Αμυντικός'))
        elif j < 15:
            names = fake.name_male().split(' ')
            c.execute("INSERT INTO 'Player' VALUES(?,?,?,?,?,?) "
                      , (None, names[0], names[1], random.randint(1, 99), i, 'Μέσος'))
        else:
            names = fake.name_male().split(' ')
            c.execute("INSERT INTO 'Player' VALUES(?,?,?,?,?,?) "
                      , (None, names[0], names[1], random.randint(1, 99), i, 'Επιθετικός'))

for i in range(1, 15):
    c.execute("INSERT INTO 'Match_day' VALUES(?) "
              , ([None]))


from datetime import datetime, timedelta


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


teams2 = ['1', '2', '3',
          '4', '5',
          '6',
          '7', '8'
          ]
start_date = datetime(2023, 6, 1, 14, 0)  # Example start date and time
match_duration = timedelta(hours=2)  # Example match duration

tournament_schedule = generate_double_round_robin(teams2, start_date, match_duration)
rounds = {}
# Print the tournament schedule
for i, round_matches in enumerate(tournament_schedule):
    # print(f"Round {i+1}:")
    rounds[i + 1] = []
    for match in round_matches:
        match_date_str = match[2].strftime("%Y-%m-%d %H:%M")  # Format match date as string
        rounds[i + 1].append([match_date_str, match[0], match[1]])
        # print(f"{match[0]} vs {match[1]} at {match_date_str}")
    # print()
# print(rounds)


teams2 = {
    '1': 1,
    '2': 0.4,
    '3': 0.8,
    '5': 0.8,
    '4': 0.6,
    '6': 0.4,
    '7': 0.7,
    '8': 0.2,
    # Add more teams and their respective weights
}


# def generate_schedule(teams):
#     fixtures = []
#     team_combinations = combinations(teams.keys(), 2)
#
#     for home_team, away_team in team_combinations:
#         for _ in range(1):  # Play twice, home and away
#             fixtures.append((home_team, away_team))
#             fixtures.append((away_team, home_team))
#
#     return fixtures
#
# fixtures = generate_schedule(teams2)

# print(fixtures)
def simulate_match(home_team, away_team, teams):
    home_weight = teams[home_team]
    away_weight = teams[away_team]
    total_weight = home_weight + away_weight
    home_prob = home_weight / total_weight

    home_score = random.randint(0, 5)  # Generate a random score for the home team
    away_score = random.randint(0, 5)  # Generate a random score for the away team

    # Use the score projection weight to modify the generated score
    score_projection_weight = 0.2  # Adjust this weight according to your requirements
    projected_home_score = round(home_score + (home_weight * score_projection_weight))
    projected_away_score = round(away_score + (away_weight * score_projection_weight))

    result = ""
    if home_score > away_score:
        result = home_team
    elif home_score < away_score:
        result = away_team
    else:
        result = "Draw"

    return result, (home_team, away_team), (projected_home_score, projected_away_score)


results = {}
for i in range(1, len(rounds) + 1):
    results[i] = [[], [], [], []]
    for j in range(len(rounds[i])):
        date, home_team, away_team = rounds[i][j]
        result = simulate_match(home_team, away_team, teams2)
        results[i][j] = [date, result]
print("results: ")
print(results)


def calculate_points(results):
    points = {}
    goals_scored = {}
    goals_conceded = {}
    matches_played = {}
    matches_won = {}
    matches_drawn = {}
    matches_lost = {}

    for team in teams2.keys():
        points[team] = 0
        goals_scored[team] = 0
        goals_conceded[team] = 0
        matches_played[team] = 0
        matches_won[team] = 0
        matches_drawn[team] = 0
        matches_lost[team] = 0

    for winner, (home_team, away_team), (home_score, away_score) in results:
        if winner == home_team:
            points[home_team] += 3  # Home team win
            goals_scored[home_team] += home_score
            goals_conceded[away_team] += home_score
            goals_scored[away_team] += away_score
            goals_conceded[home_team] += away_score
            matches_won[home_team] += 1
            matches_lost[away_team] += 1
        elif winner == away_team:
            points[away_team] += 3  # Away team win
            goals_scored[home_team] += home_score
            goals_conceded[away_team] += home_score
            goals_scored[away_team] += away_score
            goals_conceded[home_team] += away_score
            matches_won[away_team] += 1
            matches_lost[home_team] += 1
        else:  # Draw
            points[home_team] += 1
            points[away_team] += 1
            goals_scored[home_team] += home_score
            goals_conceded[away_team] += home_score
            goals_scored[away_team] += away_score
            goals_conceded[home_team] += away_score
            matches_drawn[home_team] += 1
            matches_drawn[away_team] += 1

    goal_difference = {team: goals_scored[team] - goals_conceded[team] for team in teams2.keys()}

    return points, goals_scored, goals_conceded, goal_difference, matches_won, matches_drawn, matches_lost


def calculate_standings(points, goals_scored, goals_conceded, goal_difference, matches_won, matches_drawn,
                        matches_lost):
    standings = sorted(
        points.items(),
        key=lambda x: (x[1], goal_difference[x[0]], goals_scored[x[0]]),
        reverse=True
    )
    return standings


# standings = calculate_points(results)
#
# Calculate points, goals scored, goals conceded, and goal difference
results_for_standings = []
results_for_standings2 = []
for i in range(1, len(results) + 1):
    results_for_standings += results[i]
# make new list without date
for i in range(len(results_for_standings)):
    results_for_standings2 += (results_for_standings[i][1:])
print(results_for_standings)
print(results_for_standings2)
points, goals_scored, goals_conceded, goal_difference, matches_won, matches_drawn, matches_lost = calculate_points(
    results_for_standings2)

# Calculate standings
standings = calculate_standings(points, goals_scored, goals_conceded, goal_difference, matches_won, matches_drawn,
                                matches_lost)

# Print the standings
for position, (team, team_points) in enumerate(standings, start=1):
    c.execute("INSERT INTO 'Standings' VALUES(?,?,?,?,?,?,?,?,?,?,?) "
              , (None, position, team, team_points, goals_scored[team], goals_conceded[team], goal_difference[team],
                 matches_won[team], matches_drawn[team], matches_lost[team],
                 matches_won[team] + matches_drawn[team] + matches_lost[team]))
    print(
        f"{position}. {team}: {team_points} points Goals Scored: {goals_scored[team]} Goals Conceded: {goals_conceded[team]} Goal Difference: {goal_difference[team]} Matches Won: {matches_won[team]} Matches Drawn: {matches_drawn[team]} Matches Lost: {matches_lost[team]} Matches Played: {matches_won[team] + matches_drawn[team] + matches_lost[team]}")


def fetch_stadium(i):
    c.execute("""SELECT stadium FROM Team WHERE team_id = (?) """, (i))
    item = c.fetchone()
    return item[0]


for i in range(1, 15):
    for j in range(4):
        c.execute("INSERT INTO 'Match' VALUES(?,?,?,?,?,?,?,?) "
                  , (None, fetch_stadium(results[i][j][1][1][0]), results[i][j][0], results[i][j][1][2][0],
                     results[i][j][1][2][1], results[i][j][1][1][0], results[i][j][1][1][1], i))

conn.commit()
# Close connection
conn.close()

print("Database created successfully")
