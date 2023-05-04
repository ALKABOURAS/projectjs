const express = require('express');
const app = express();
const {engine} = require('express-handlebars');
const path = require('path');
const handlebars = require("handlebars");
app.use(express.static(path.join(__dirname + '/public') ) );
//Handlebars
app.engine('handlebars', engine({defaultLayout: 'main', layoutsDir: 'views/layouts/'}));
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Routes
app.get('/', (req, res) => {
    res.render('index', {title: 'Home', logos:[
            {'logo_id': 'norths_logo','logo_src': 'norths-logo.svg'},
            {'logo_id': 'reds_logo','logo_src': 'reds-logo.svg'},
            {'logo_id': 'greens_logo','logo_src': 'greens-logo.svg'},
            {'logo_id': 'crabs_logo','logo_src': 'crabs-logo.svg'},
            {'logo_id': 'winners_logo','logo_src': 'winners-logo.svg'},
            {'logo_id': 'elders_logo','logo_src': 'elders-logo.svg'},
            {'logo_id': 'raiders_logo','logo_src': 'raiders-logo.svg'},
            {'logo_id': 'angels_logo','logo_src': 'angels-logo.svg'}
        ],
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
        team_list: [{'stad_img':'toumpa-small.svg','team_img':"norths-small",'team_bg':'#1E1E1E','team_name':'Salonica Norths'},
            {'stad_img':'narcos-small.svg','team_img':"reds-small",'team_bg':'#D31313','team_name':'Noor1 Reds'},
            {'stad_img': 'votanikos-small.svg','team_img':"greens-small",'team_bg':'#24A83C','team_name':'Green Last Believers'},
            {'stad_img': 'propap-small.svg','team_img':"crabs-small",'team_bg':'rgba(255, 235, 0, 0.96)','team_name':'New Philla Crabs'},
            {'stad_img': 'patras-small.svg','team_img':"winners-small",'team_bg':'#980100','team_name':'Patras Winners'},
            {'stad_img': 'elders-small.svg','team_img':"selders-small",'team_bg':'#007AFF','team_name':'Salonica Elders'},
            {'stad_img': 'morias-small.svg','team_img':"traiders-small",'team_bg':'#215E97','team_name':'Triple City Raiders'},
            {'stad_img':'volos-small.svg','team_img':"avolos-small",'team_bg':'#C2D1D9','team_name':'Volos Angels'}],
        logos:[
            {'logo_id': 'norths_logo','logo_src': 'norths-logo.svg'},
            {'logo_id': 'reds_logo','logo_src': 'reds-logo.svg'},
            {'logo_id': 'greens_logo','logo_src': 'greens-logo.svg'},
            {'logo_id': 'crabs_logo','logo_src': 'crabs-logo.svg'},
            {'logo_id': 'winners_logo','logo_src': 'winners-logo.svg'},
            {'logo_id': 'elders_logo','logo_src': 'elders-logo.svg'},
            {'logo_id': 'raiders_logo','logo_src': 'raiders-logo.svg'},
            {'logo_id': 'angels_logo','logo_src': 'angels-logo.svg'}
        ],
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
        logos:[
            {'logo_id': 'norths_logo','logo_src': 'norths-logo.svg'},
            {'logo_id': 'reds_logo','logo_src': 'reds-logo.svg'},
            {'logo_id': 'greens_logo','logo_src': 'greens-logo.svg'},
            {'logo_id': 'crabs_logo','logo_src': 'crabs-logo.svg'},
            {'logo_id': 'winners_logo','logo_src': 'winners-logo.svg'},
            {'logo_id': 'elders_logo','logo_src': 'elders-logo.svg'},
            {'logo_id': 'raiders_logo','logo_src': 'raiders-logo.svg'},
            {'logo_id': 'angels_logo','logo_src': 'angels-logo.svg'}
        ],
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


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

