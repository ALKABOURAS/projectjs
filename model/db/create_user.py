import sqlite3
import os
import random
from itertools import combinations
from datetime import datetime, timedelta

from faker import Faker

fake = Faker('el_GR')

random.seed(23)

path = os.path.dirname(os.path.abspath(__file__))
print(path)

# Delete database if exists
if os.path.exists(path + '/database.sqlite'):
    os.remove(path + '/database.sqlite')

# Connect to database
conn = sqlite3.connect(path + '/database.sqlite')
c = conn.cursor()
c.execute("""DROP TABLE IF EXISTS 'user';""")
c.execute("""
CREATE TABLE IF NOT EXISTS 'user' (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'username' TEXT NOT NULL,
  'password' TEXT NOT NULL
);
""")
c.execute("""
    insert into user (username, password) values ('admin', 'admin');
""")

conn.commit()
# Close connection
conn.close()

print("Database created successfully")