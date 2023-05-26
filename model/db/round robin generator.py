import itertools
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
teams2 = ['Salonica Norths','Noor1 Reds', 'Green Last Believers',
         'New Philla Crabs','Patras Winners',
         'Salonica Elders',
         'Triple City Raiders','Volos Angels'
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