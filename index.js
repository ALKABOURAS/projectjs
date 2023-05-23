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
        team_list: [{'stad_img':'toumpa-small.svg','team_img':"norths-small",'team_bg':'#1E1E1E','team_name':'Salonica Norths', 'logos_team_name':'norths'},
            {'stad_img':'narcos-small.svg','team_img':"reds-small",'team_bg':'#D31313','team_name':'Noor1 Reds', 'logos_team_name':'reds'},
            {'stad_img': 'votanikos-small.svg','team_img':"greens-small",'team_bg':'#24A83C','team_name':'Green Last Believers', 'logos_team_name':'greens'},
            {'stad_img': 'propap-small.svg','team_img':"crabs-small",'team_bg':'#BAAC13','team_name':'New Philla Crabs', 'logos_team_name':'crabs'},
            {'stad_img': 'patras-small.svg','team_img':"winners-small",'team_bg':'#980100','team_name':'Patras Winners', 'logos_team_name':'winners'},
            {'stad_img': 'elders-small.svg','team_img':"elders-small",'team_bg':'#007AFF','team_name':'Salonica Elders', 'logos_team_name':'elders'},
            {'stad_img': 'morias-small.svg','team_img':"raiders-small",'team_bg':'#215E97','team_name':'Triple City Raiders', 'logos_team_name':'raiders'},
            {'stad_img':'volos-small.svg','team_img':"angels-small",'team_bg':'#C2D1D9','team_name':'Volos Angels', 'logos_team_name':'angels'}],
        logos:[
            {'logo_id': 'norths_logo','logo_src': 'norths-logo.svg' ,'team_name':'norths'},
            {'logo_id': 'reds_logo','logo_src': 'reds-logo.svg','team_name':'reds'},
            {'logo_id': 'greens_logo','logo_src': 'greens-logo.svg','team_name':'greens'},
            {'logo_id': 'crabs_logo','logo_src': 'crabs-logo.svg','team_name':'crabs'},
            {'logo_id': 'winners_logo','logo_src': 'winners-logo.svg','team_name':'winners'},
            {'logo_id': 'elders_logo','logo_src': 'elders-logo.svg','team_name':'elders'},
            {'logo_id': 'raiders_logo','logo_src': 'raiders-logo.svg','team_name':'raiders'},
            {'logo_id': 'angels_logo','logo_src': 'angels-logo.svg','team_name':'angels'}
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
            {'logo_id': 'norths_logo','logo_src': 'norths-logo.svg' ,'team_name':'norths'},
            {'logo_id': 'reds_logo','logo_src': 'reds-logo.svg','team_name':'reds'},
            {'logo_id': 'greens_logo','logo_src': 'greens-logo.svg','team_name':'greens'},
            {'logo_id': 'crabs_logo','logo_src': 'crabs-logo.svg','team_name':'crabs'},
            {'logo_id': 'winners_logo','logo_src': 'winners-logo.svg','team_name':'winners'},
            {'logo_id': 'elders_logo','logo_src': 'elders-logo.svg','team_name':'elders'},
            {'logo_id': 'raiders_logo','logo_src': 'raiders-logo.svg','team_name':'raiders'},
            {'logo_id': 'angels_logo','logo_src': 'angels-logo.svg','team_name':'angels'}
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

team_dets=[[{ 'stad_img':'toumpa.svg','team_img':"norths-small",'team_bg':'#1E1E1E','team_name':'Salonica Norths'}],
    [{'stad_img':'narcos.svg','team_img':"reds-small",'team_bg':'#D31313','team_name':'Noor1 Reds'}],
    [{'stad_img': 'botanikos.svg','team_img':"greens-small",'team_bg':'#24A83C','team_name':'Green Last Believers'},
    ],[{'stad_img': 'propap.svg','team_img':"crabs-small",'team_bg':'#BAAC13','team_name':'New Philla Crabs'},
    ],[{'stad_img': 'patras.svg','team_img':"winners-small",'team_bg':'#980100','team_name':'Patras Winners'},
    ],[{'stad_img': 'elders.svg','team_img':"elders-small",'team_bg':'#007AFF','team_name':'Salonica Elders'},
    ],[{'stad_img': 'morias.svg','team_img':"raiders-small",'team_bg':'#215E97','team_name':'Triple City Raiders'},
    ],[{'stad_img':'volos.svg','team_img':"angels-small",'team_bg':'#C2D1D9','team_name':'Volos Angels'}
]]
names = ['norths','reds','greens','crabs','winners','elders','raiders','angels']
for (let i = 0; i < team_dets.length; i++) {
    app.get('/teams/'+names[i], (req, res) => {
    res.render('team-page', {title: 'Team', css: 'team-banner.css',
        logos:[
            {'logo_id': 'norths_logo','logo_src': 'norths-logo.svg' ,'team_name':'norths'},
            {'logo_id': 'reds_logo','logo_src': 'reds-logo.svg','team_name':'reds'},
            {'logo_id': 'greens_logo','logo_src': 'greens-logo.svg','team_name':'greens'},
            {'logo_id': 'crabs_logo','logo_src': 'crabs-logo.svg','team_name':'crabs'},
            {'logo_id': 'winners_logo','logo_src': 'winners-logo.svg','team_name':'winners'},
            {'logo_id': 'elders_logo','logo_src': 'elders-logo.svg','team_name':'elders'},
            {'logo_id': 'raiders_logo','logo_src': 'raiders-logo.svg','team_name':'raiders'},
            {'logo_id': 'angels_logo','logo_src': 'angels-logo.svg','team_name':'angels'}
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
            ],
            team_dets: team_dets[i]

        } )})};


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

