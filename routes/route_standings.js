const express = require('express');
const path = require("path");
const router = express.Router();
const dbPath = path.resolve(__dirname,'..', 'model', 'db', 'database.sqlite');
const db = require('better-sqlite3')(dbPath);

router.get('/standings', (req, res) => {
    res.render('standings', {title: 'Standings', css: 'standings.css',
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
        teams: db.prepare('SELECT s.position,t.team_name_short,s.played,s.wins,s.loses,s.draws,s.goals_for,s.goals_against,s.goals_difference, s.points, t.team_name FROM standings as s, team as t where s.team_id =t.team_id ').all()
    } )});

module.exports = router;