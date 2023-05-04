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
handlebars.registerHelper('for', (from, to, block) => {
    var accum = '';
    for (var i = from; i < to; i++) {
        accum += block.fn(i);
    }
    return accum;
});
//Routes
app.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
} );
app.get('/teams', (req, res) => {
    res.render('teams', {title: 'Teams', css: 'teams.css', logo_id: logo_id,
        logo_src: logo_src, logo_alt: logo_alt, item_title: item_title, item_bg_colors: item_bg_colors});
} );

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

{
    logo_id = ["norths-small", "reds-small", "greens-small",
        "crabs-small", "winners-small", "selders-small", "traiders-small", "avolos-small"];

    logo_src = ["norths-logo.svg", "reds-logo.svg", "greens-logo.svg",
        "crabs-logo.svg", "winners-logo.svg", "elders-logo.svg", "raiders-logo.svg", "angels-logo.svg"];

    logo_alt = ["Norths Logo", "Reds Logo", "Greens Logo", "Crabs Logo", "Winners Logo", "Elders Logo", "Raiders Logo", "Angels Logo"];

    item_title = ['Salonica Norths', 'Noor1 Reds', 'Green Last Believers', 'New Philla Crabs', 'Patras Winners',
        'Salonica Elders', 'Triple City Raiders', 'Volos Angels'];

    stad_name = ['toumpa-small.svg', 'narcos-small.svg', 'votanikos-small.svg', 'propap-small.svg',
        'patras-small.svg', 'elders-small.svg', 'morias-small.svg', 'volos-small.svg'];

    item_bg_colors = ['#1E1E1E', '#D31313', '#24A83C', 'rgba(255, 235, 0, 0.96)', '#980100', '#980100', '#215E97', '#C2D1D9'];
}