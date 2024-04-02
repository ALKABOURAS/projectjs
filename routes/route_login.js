const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const router = express.Router();
const dbPath = path.resolve(__dirname,'..', 'model', 'db', 'database.sqlite');
const db = require('better-sqlite3')(dbPath);

router.post('/auth', async function (request, response) {
    // Capture the input fields
    let username = request.body.username;
    let password = request.body.password;
    // Check the username and password with db
    try {
        const creds = db.prepare('SELECT username, password FROM user WHERE username = ?').get(username);

        async function comparePasswords() {
            try {
                const isMatch = await bcrypt.compare(password, creds.password.toString());
                if (isMatch) {
                    console.log("Password is a match!");
                    return isMatch;
                } else {
                    console.log("Password is not a match!");
                }

            } catch (error) {
                console.error(error);
            }
        }

        let isMatch = await comparePasswords();
        if (creds.username === username && isMatch === true) {

            // Create a session variable
            request.session.loggedin = true;
            request.session.user = username;
            // Redirect to home page
            response.redirect('/content');
        } else {
            // Redirect to login page
            response.redirect('/login');
        }
    } catch (error) {
        response.redirect('/login');
    }


});
router.get('/sendMessage', function(request, response) {
    let name = request.query['name'];
    let email = request.query['email'];
    let message = request.query['message'];
    let surname = request.query['surname'];
    let company = request.query['company'];
    db.prepare('INSERT INTO messages (name, surname, email, company, message) VALUES (?, ?, ?, ?, ?)').run(name, surname, email, company, message);
    response.redirect('/contact');
});


router.get('/login', (req, res) => {
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

router.get('/logout', function (req, res) {
    if (req.session.loggedin === true) {
        req.session.destroy();

        res.redirect('/');
    }
    else {
        res.redirect('/login');
    }
});

router.get('/content', function(request, response) {
    // If the user is loggedin

    if (request.session.loggedin) {
        // Output username
        const user = request.session.user;
        response.render('content', {title: 'Admin Page', css: 'admin.css',
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
                user: user,
                announce:  db.prepare('SELECT id,title, content,link FROM announcements').all(),
                match_scores: db.prepare('SELECT home_score, away_score FROM match').all(),
                message: db.prepare('SELECT id, name, surname, email, company, message FROM messages').all(),
            }
        );
    }
    else {
        // Not logged in
        response.redirect('/login');
    }
    // response.end();
});
// admin routes to delete and add announcements

router.get('/deleteAnnouncement',function(req,res)  {
    user = req.session.user;
    let id = req.query["id"];
    console.log(id);
    db.prepare("DELETE FROM announcements WHERE id = ?").run(id);
    res.redirect('/content');
});
router.get('/deleteMessage',function(req,res)  {
    user = req.session.user;
    let id = req.query["id"];
    console.log(id);
    db.prepare("DELETE FROM messages WHERE id = ?").run(id);
    res.redirect('/content');
});
router.get('/updateAnnouncement',function(req,res)  {
    user = req.session.user;
    let id = req.query["id2"];
    let title = req.query["title2"];
    let content = req.query["content2"];
    db.prepare("UPDATE announcements SET title = ?, content = ? WHERE id = ?").run(title,content,id);
    res.redirect('/content');
});

router.get('/submitAnnouncement',function(req,res)  {
        user = req.session.user;
        let title = req.query["title"];
        let content = req.query["content"];
        let link = req.query["link"];
        db.prepare("INSERT INTO announcements (title,content,link) VALUES (?,?,?)").run(title,content,link);
        res.redirect('/content');
    }
);

module.exports = router;