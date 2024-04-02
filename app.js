const express = require('express');
const app = express();
const {engine} = require('express-handlebars');
const path = require('path');
const handlebars = require("handlebars");
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const popup = require('node-popup');
const cookieParser = require("cookie-parser");
// path to the database
const dbPath = path.resolve(__dirname, 'model', 'db', 'database.sqlite');
// connect to the database
let db = require('better-sqlite3')(dbPath);
console.log('Connected to the database '+dbPath.split('\\').pop());
app.use(express.static(path.join(__dirname + '/public') ) );

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
//Handlebars
app.engine('handlebars', engine({defaultLayout: 'main', layoutsDir: 'views/layouts/'}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
//Routes


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



//add cookies for session lenghth
app.use(cookieParser());


app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 2*3600000 }
}));

// session checker
var auth = function(req, res, next) {
    if (req.session && req.session.user === "admin")
        return next();
    else
        return res.sendStatus(401);
};


// end session checker

app.use(require('./routes/route_teams.js'));
app.use(require('./routes/route_about.js'));
app.use(require('./routes/route_contact.js'));
app.use(require('./routes/route_standings.js'));
app.use(require('./routes/route_schedule.js'));
app.use(require('./routes/route_teams_list.js'));
app.use(require('./routes/route_home.js'));
app.use(require('./routes/route_login.js'));

app.listen(port, () => {
    console.log('Server is running on port 8080');
});

