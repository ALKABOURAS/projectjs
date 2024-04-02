const express = require('express');
const path = require("path");
const router = express.Router();
const dbPath = path.resolve(__dirname,'..', 'model', 'db', 'database.sqlite');
const db = require('better-sqlite3')(dbPath);


names = ['norths','reds','greens','crabs','winners','elders','raiders','angels']

for (let i = 0; i < names.length; i++) {
    router.get('/teams/'+names[i], (req, res) => {
        res.render('team-page', {title: 'Team', css: 'team-banner.css',
            logos : db.prepare('SELECT team_name_short FROM team').all(),
            infos:[
                {'info_id': 'location','info_src': 'location.svg','info_text': 'Μεσογείων 174, 151 25 Μαρούσι'},
                {'info_id': 'phone_number','info_src': 'phone.svg','info_text': '+302310954050'},
                {'info_id': 'email','info_src': 'email.svg','info_text': 'info@ultraleague.gr'}
            ],
            navbar:[
                {'navbar_text': 'Ομάδες', 'button_href': '/teams'},
                {'navbar_text': 'Πρόγραμμα', 'button_href': '/schedule'},
                {'navbar_text': 'Βαθμολογία', 'button_href': '/standings'},
                {'navbar_text': 'Επικοινωνία', 'button_href': '/contact'},
                {'navbar_text': 'About', 'button_href': '/about'}
            ],
            team_dets: db.prepare('SELECT * FROM team WHERE team_id = '+(i+1)).all(),
            goalkeepers: db.prepare("SELECT player_name, player_surname, player_number, player_position FROM player WHERE player_position = 'Τερματοφύλακας' and team_id = "+(i+1)).all(),
            defenders: db.prepare("SELECT player_name, player_surname, player_number, player_position FROM player WHERE player_position = 'Αμυντικός' and team_id = "+(i+1)).all(),
            midfielders: db.prepare("SELECT player_name, player_surname, player_number, player_position FROM player WHERE player_position = 'Μέσος' and team_id = "+(i+1)).all(),
            forwards: db.prepare("SELECT player_name, player_surname, player_number, player_position FROM player WHERE player_position = 'Επιθετικός' and team_id = "+(i+1)).all(),
            stats: db.prepare("SELECT position, points,played FROM standings WHERE team_id = "+(i+1)).all()
        } )})}

module.exports = router;
