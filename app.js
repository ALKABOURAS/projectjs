const express = require('express');
const app = express();
const {engine} = require('express-handlebars');
const path = require('path');
const handlebars = require("handlebars");
const passport = require('passport');
const sessions = require('express-session');
const morgan = require('morgan');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');

// path to the database
const dbPath = path.resolve(__dirname, 'model', 'db', 'database.sqlite');
// connect to the database
const db = require('better-sqlite3')(dbPath);
console.log('Connected to the database '+dbPath.split('\\').pop());
app.use(express.static(path.join(__dirname + '/public') ) );
//Handlebars
app.engine('handlebars', engine({defaultLayout: 'main', layoutsDir: 'views/layouts/'}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
//Routes
app.get('/', (req, res) => {
    res.render('index', {title: 'Home',
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
        ]});
} );
app.get('/teams', (req, res) => {
    res.render('teams', {title: 'Teams', css: 'teams.css',
        team_list: db.prepare('SELECT * FROM team').all(),
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
        ]} )});

app.get('/schedule', (req, res) => {
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
        matches:[
            {'match_id': 'match1','match_day': 'Κυριακή','match_date': '10/10/2021',
                'match_team1': 'Νοορ1 Ρεντς','match_team2': 'Τριπλ Σιτι Ρειντερς',
                'match_score1': '3','match_score2': '2',
                'logo_id1': 'reds_logo','logo_src1': 'reds-logo.svg',
                'logo_id2': 'raiders_logo','logo_src2': 'raiders-logo.svg',
                'info_id2': 'location','info_src2': 'location-black.svg',
                'info_id1': 'phone_number','info_src1': 'clock-dark.svg',
                'match_location':'Narcos Arena'}]} )});

app.get('/login', (req, res) => {
  res.render('login', {title: 'Login', css: 'login.css', js: 'login.js',
  logos : db.prepare('SELECT team_name_short FROM team').all()});
});

names = ['norths','reds','greens','crabs','winners','elders','raiders','angels']

for (let i = 0; i < names.length; i++) {
    app.get('/teams/'+names[i], (req, res) => {
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
        team_dets: db.prepare('SELECT * FROM team WHERE team_id = '+(i+1)).all()
        } )})}


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

