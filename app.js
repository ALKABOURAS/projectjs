const express = require('express');
const app = express();
const {engine} = require('express-handlebars');
const path = require('path');
const handlebars = require("handlebars");
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const cookieParser = require("cookie-parser");
const SQLiteStore = require('connect-sqlite3')(session); // store for sessions
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
// establish sessions
// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 2000 * 60 * 60,
//         sameSite: true
//     },
//     store: new SQLiteStore({ db: 'session.sqlite', dir: './model/sessions' })
// }));
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
        ],
    });
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
        ],
    } )});

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
        matchday: matchday
    } )});

app.get('/standings', (req, res) => {
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

app.get('/contact', (req, res) => {
    res.render('contact', {title: 'Contact', css: 'contact.css',
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

})});

app.get('/login', (req, res) => {
  res.render('login', {title: 'Login', css: 'login.css', js: 'login.js',
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
  });
});

app.get('/about', (req, res) => {
    res.render('about', {title: 'About Us', css: 'about.css',
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
    });
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
        team_dets: db.prepare('SELECT * FROM team WHERE team_id = '+(i+1)).all(),
        goalkeepers: db.prepare("SELECT player_name, player_surname, player_number, player_position FROM player WHERE player_position = 'Τερματοφύλακας' and team_id = "+(i+1)).all(),
        defenders: db.prepare("SELECT player_name, player_surname, player_number, player_position FROM player WHERE player_position = 'Αμυντικός' and team_id = "+(i+1)).all(),
        midfielders: db.prepare("SELECT player_name, player_surname, player_number, player_position FROM player WHERE player_position = 'Μέσος' and team_id = "+(i+1)).all(),
        forwards: db.prepare("SELECT player_name, player_surname, player_number, player_position FROM player WHERE player_position = 'Επιθετικός' and team_id = "+(i+1)).all(),
        stats: db.prepare("SELECT position, points,played FROM standings WHERE team_id = "+(i+1)).all()
    } )})}

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

