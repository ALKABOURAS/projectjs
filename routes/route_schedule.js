const express = require('express');
const path = require("path");
const router = express.Router();
const dbPath = path.resolve(__dirname,'..', 'model', 'db', 'database.sqlite');
const db = require('better-sqlite3')(dbPath);

function matchday_maker(){
    let matchday = [];
    for (let i = 1; i <= 14; i++) {
        matchday[i-1] = {"match_day_id": i, "match":db.prepare("SELECT * FROM match where match_day_id = "+i).all()};}
    return matchday;

}
matchday = matchday_maker()
// add in matchday the bg colorof home and away team and the name of the teams and the shot name
for (let i = 0; i < matchday.length; i++) {
    for (let j = 0; j < matchday[i].match.length; j++) {
        matchday[i].match[j].home_bg = (db.prepare("SELECT team_bg FROM team where team_id = "+matchday[i].match[j].home_team).get())['team_bg'];
        matchday[i].match[j].away_bg = (db.prepare("SELECT team_bg FROM team where team_id = "+matchday[i].match[j].away_team).get())['team_bg'];
        matchday[i].match[j].home_name = (db.prepare("SELECT team_name FROM team where team_id = "+matchday[i].match[j].home_team).get())['team_name'];
        matchday[i].match[j].away_name = (db.prepare("SELECT team_name FROM team where team_id = "+matchday[i].match[j].away_team).get())['team_name'];
        matchday[i].match[j].home_name_short = (db.prepare("SELECT team_name_short FROM team where team_id = "+matchday[i].match[j].home_team).get())['team_name_short'];
        matchday[i].match[j].away_name_short = (db.prepare("SELECT team_name_short FROM team where team_id = "+matchday[i].match[j].away_team).get())['team_name_short'];}}

router.get('/schedule', (req, res) => {
    res.render('schedule', {title: 'Schedule', css: 'schedule.css',
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
        matchday: matchday
    } )});

module.exports = router;