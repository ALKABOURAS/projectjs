import sqlite3
import os
import random

path = os.path.dirname(os.path.abspath(__file__))

# Delete database if exists
if os.path.exists('database.sqlite'):
    os.remove('database.sqlite')

# Connect to database
conn = sqlite3.connect('database.sqlite')
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
	'stadium_address' TEXT NOT NULL
);""")

c.execute("""
CREATE TABLE 'Player' (
	'player_id' INTEGER PRIMARY KEY AUTOINCREMENT,
	'player_name' TEXT NOT NULL,
	'player_number' TEXT NOT NULL,
    'team_id' INTEGER NOT NULL,
	FOREIGN KEY('team_id') REFERENCES 'Team'('team_id')
);""")

c.execute("""
CREATE TABLE 'Match' (
	'match_id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'stadium' TEXT NOT NULL REFERENCES 'Team'('stadium'),
	'match_date' DATETIME NOT NULL,
	'home_score' INTEGER NOT NULL,
	'away_score' INTEGER NOT NULL,
    'home_team' INTEGER NOT NULL,
    'away_team' INTEGER NOT NULL,
    'match_day_id' INTEGER NOT NULL,
	FOREIGN KEY('home_team') REFERENCES 'Team'('team_id'),
	FOREIGN KEY('away_team') REFERENCES 'Team'('team_id'),
	FOREIGN KEY('match_day_id') REFERENCES 'Match_day'('id')
);""")

c.execute("""
CREATE TABLE 'Match_day' (
	'id' INTEGER PRIMARY KEY AUTOINCREMENT
);
""")

c.execute("INSERT INTO 'Team' VALUES(?,?,?,?,?,?,?,?) "
        ,(None,"Paok","Thessal","email@emal.gr","35966596254","135.com","haha","haha 23"))

c.execute("INSERT INTO 'Team' VALUES(?,?,?,?,?,?,?,?) "
        ,(None,"Olympiakos","Pireas","fgghsr","35966596254","135.com","haha","haha 23"))

c.execute("INSERT INTO 'Team' VALUES(?,?,?,?,?,?,?,?) "
        ,(None,"Aris","Thessal","cdvrbg","35966596254","135.com","haha","haha 23"))

c.execute("INSERT INTO 'Team' VALUES(?,?,?,?,?,?,?,?) "
        ,(None,"Aek","Athens","cdvrbg","35966596254","135.com","haha","haha 23"))

c.execute("INSERT INTO 'Team' VALUES(?,?,?,?,?,?,?,?) "
        ,(None,"Panathinaikos","Athens","cdvrbg","35966596254","135.com","haha","haha 23"))

for i in range(1,50):
    c.execute("INSERT INTO 'Player' VALUES(?,?,?,?) "
        ,(None,f"Giorgos {i}",str(i),random.randint(1,5)))

c.execute("INSERT INTO 'Match_day' VALUES(?) "
        ,([None]))

c.execute("INSERT INTO 'Match_day' VALUES(?) "
        ,([None]))

c.execute("INSERT INTO 'Match_day' VALUES(?) "
        ,([None]))

c.execute("INSERT INTO 'Match' VALUES(?,?,?,?,?,?,?,?) "
        ,(None,"Toumba","2019-12-12 12:00:00","2","1","1","2","1"))

c.execute("INSERT INTO 'Match' VALUES(?,?,?,?,?,?,?,?) "
        ,(None,"Toumba","2019-12-12 12:00:00","2","1","1","3","1"))

c.execute("INSERT INTO 'Match' VALUES(?,?,?,?,?,?,?,?) "
        ,(None,"Toumba","2019-12-12 12:00:00","2","1","1","4","1"))

c.execute("INSERT INTO 'Match' VALUES(?,?,?,?,?,?,?,?) "
        ,(None,"Toumba","2019-12-12 12:00:00","2","1","1","5","1"))

c.execute("INSERT INTO 'Match' VALUES(?,?,?,?,?,?,?,?) "
        ,(None,"OAKA","2019-12-12 12:00:00","2","1","5","1","1"))

c.execute("INSERT INTO 'Match' VALUES(?,?,?,?,?,?,?,?) "
        ,(None,"OAKA","2019-12-12 12:00:00","2","1","5","2","1"))

c.execute("INSERT INTO 'Match' VALUES(?,?,?,?,?,?,?,?) "
        ,(None,"OAKA","2019-12-12 12:00:00","2","1","5","3","1"))

c.execute("INSERT INTO 'Match' VALUES(?,?,?,?,?,?,?,?) "
        ,(None,"OAKA","2019-12-12 12:00:00","2","1","5","4","1"))

c.execute("INSERT INTO 'Match' VALUES(?,?,?,?,?,?,?,?) "
        ,(None,"OAKA","2019-12-12 12:00:00","2","1","5","1","2"))

conn.commit()
# Close connection
conn.close()

print("Database created successfully")


