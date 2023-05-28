import random
from itertools import combinations

random.seed(2322323233)
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
teams2 = ['1','2', '3',
          '4','5',
          '6',
          '7','8'
          ]
start_date = datetime(2023, 6, 1, 14, 0)  # Example start date and time
match_duration = timedelta(hours=2)  # Example match duration

tournament_schedule = generate_double_round_robin(teams2, start_date, match_duration)
rounds = {}
# Print the tournament schedule
for i, round_matches in enumerate(tournament_schedule):
    # print(f"Round {i+1}:")
    rounds[i+1] = []
    for match in round_matches:

        match_date_str = match[2].strftime("%Y-%m-%d %H:%M")  # Format match date as string
        rounds[i+1].append([match_date_str,match[0],match[1]])
        # print(f"{match[0]} vs {match[1]} at {match_date_str}")
    # print()
# print(rounds)


teams2 = {
    '1': 1,
    '7': 0.8,
    '5': 0.8,
    '4': 0.6,
    '3': 0.5,
    '6': 0.4,
    '2': 0.7,
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

    return result, (home_team, away_team),(projected_home_score, projected_away_score)


results = {}
for i in range(1, len(rounds)+1):
    results[i] = [[],[],[],[]]
    for j in range(len(rounds[i])):
        date, home_team, away_team = rounds[i][j]
        result = simulate_match(home_team, away_team, teams2)
        results[i][j]= [date,result]
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

    for winner, (home_team, away_team) , (home_score, away_score) in results:
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
def calculate_standings(points, goals_scored, goals_conceded, goal_difference, matches_won, matches_drawn, matches_lost):
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
for i in range(1, len(results)+1):
    results_for_standings+=results[i]
# make new list without date
for i in range(len(results_for_standings)):
    results_for_standings2+=(results_for_standings[i][1:])
print(results_for_standings)
print(results_for_standings2)
points, goals_scored, goals_conceded, goal_difference, matches_won, matches_drawn, matches_lost = calculate_points(results_for_standings2)

# Calculate standings
standings = calculate_standings(points, goals_scored, goals_conceded, goal_difference, matches_won, matches_drawn, matches_lost)

# Print the standings
for position, (team, team_points) in enumerate(standings, start=1):
    print(f"{position}. {team}: {team_points} points Goals Scored: {goals_scored[team]} Goals Conceded: {goals_conceded[team]} Goal Difference: {goal_difference[team]} Matches Won: {matches_won[team]} Matches Drawn: {matches_drawn[team]} Matches Lost: {matches_lost[team]} Matches Played: {matches_won[team]+matches_drawn[team]+matches_lost[team]}")


# Home Team
print(results[1][0][1][2][0])