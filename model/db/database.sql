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
