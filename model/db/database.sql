DROP TABLE IF EXISTS 'Team';
CREATE TABLE 'Team' (
	'team_id' INTEGER PRIMARY KEY AUTOINCREMENT,
	'team_name' TEXT NOT NULL,
	'city' TEXT NOT NULL,
	'email' TEXT NOT NULL,
	'phone_num' TEXT NOT NULL,
	'website' TEXT NOT NULL,
	'stadium' TEXT NOT NULL,
	'stadium_address' TEXT NOT NULL
);
DROP TABLE IF EXISTS 'Player';
CREATE TABLE 'Player' (
	'player_id' INTEGER PRIMARY KEY AUTOINCREMENT,
	'player_name' TEXT NOT NULL,
	'player_number' TEXT NOT NULL,
	FOREIGN KEY('team_id') REFERENCES 'Team'('team_id')
);
DROP TABLE IF EXISTS 'Match';
CREATE TABLE 'Match' (
	'match_id' INTEGER PRIMARY KEY AUTOINCREMENT,
	FOREIGN KEY('stadium') REFERENCES 'Team'('stadium') NOT NULL,
	'match_date' DATETIME NOT NULL,
	'home_score' INTEGER NOT NULL,
	'away_score' INTEGER NOT NULL,
	FOREIGN KEY('home_team') REFERENCES 'Team'('team_id'),
	FOREIGN KEY('away_team') REFERENCES 'Team'('team_id'),
	FOREIGN KEY('match_day_id') REFERENCES 'Match_day'('id')
);
DROP TABLE IF EXISTS 'Match_day';
CREATE TABLE 'Match_day' (
	'id' INTEGER PRIMARY KEY AUTOINCREMENT
);

DROP TABLE IF EXISTS 'user';
CREATE TABLE IF NOT EXISTS 'user' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'username' TEXT NOT NULL,
  'password' TEXT NOT NULL
);

DROP TABLE IF EXISTS 'anouncements';
CREATE TABLE IF NOT EXISTS 'anouncements' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'title' TEXT NOT NULL,
  'content' TEXT NOT NULL,
  'link' TEXT NOT NULL
);
DROP TABLE IF EXISTS 'messages';
CREATE TABLE IF NOT EXISTS 'messages' (
											  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
											  'name' TEXT NOT NULL,
											  'surname' TEXT NOT NULL,
											  'email' TEXT NOT NULL,
											  'message' TEXT NOT NULL,
											  'company' TEXT NOT NULL

);

-- Write a query that returns the team name, city, and stadium for a specific team.
SELECT team_name, city, stadium FROM Team WHERE team_id = ?;

-- Write a query that returns all attibutes for a match.
SELECT * FROM Match WHERE match_id = ?;

-- Write a query that returns the total goals scored by the home team grouped by the home team.
SELECT home_team, SUM(home_score) FROM Match GROUP BY home_team;

-- Write a query that returns the total goals scored by the away team grouped by the away team.
SELECT away_team, SUM(away_score) FROM Match GROUP BY away_team;

-- Write a query that returns the total goals scored by the home team grouped by the home team and match day.
SELECT home_team, SUM(home_score) FROM Match GROUP BY home_team, match_day_id;

-- Write a query that returns the total goals scored by the away team grouped by the away team and match day.
SELECT away_team, SUM(away_score) FROM Match GROUP BY away_team, match_day_id;

-- Write a query that returns the name(s) of the team(s) that scored the most goals.
SELECT MAX(total_goals), home_team as team_most_goals FROM (SELECT SUM(home_score) AS total_goals, home_team FROM Match GROUP BY home_team) UNION SELECT MAX(total_goals), away_team FROM (SELECT SUM(away_score) AS total_goals, away_team FROM Match GROUP BY away_team);

-- Write a query that returns the name(s) of the team(s) that scored the least goals.
SELECT MIN(total_goals), home_team as team_least_goals FROM (SELECT SUM(home_score) AS total_goals, home_team FROM Match GROUP BY home_team) UNION SELECT MIN(total_goals), away_team FROM (SELECT SUM(away_score) AS total_goals, away_team FROM Match GROUP BY away_team);

-- Write a query that returns the name(s) of the team(s) that scored the most goals on a match day.
SELECT MAX(total_goals), home_team as team_most_goals FROM (SELECT SUM(home_score) AS total_goals, home_team, match_day_id FROM Match GROUP BY home_team, match_day_id) UNION SELECT MAX(total_goals), away_team FROM (SELECT SUM(away_score) AS total_goals, away_team, match_day_id FROM Match GROUP BY away_team, match_day_id);

-- Write a query that returns the name(s) of the team(s) that scored the least goals on a match day.
SELECT MIN(total_goals), home_team as team_least_goals FROM (SELECT SUM(home_score) AS total_goals, home_team, match_day_id FROM Match GROUP BY home_team, match_day_id) UNION SELECT MIN(total_goals), away_team FROM (SELECT SUM(away_score) AS total_goals, away_team, match_day_id FROM Match GROUP BY away_team, match_day_id);

-- Write a query that returns the team_bg color for a specific team.
SELECT team_bg FROM Team WHERE team_id = home_team;

-- Write a query that returns the team_bg color for a specific team.
SELECT team_bg FROM Team WHERE team_id = away_team;
