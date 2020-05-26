var PORT = 8080;

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const url = require('url');
const querystring = require('querystring');

const app = express();
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use( express.static( process.cwd() +'/views') );
app.set("view engine", "ejs");

var sess;

app.get('/todolist', function(req,res) {

    sess = req.session;
    
    if ( sess.taches === undefined) {
        sess.taches = [];
    }
    res.render('todolist2.ejs', {arr : sess.taches});

    return res.end();
});

app.post('/ajout', function(req,res) {

    sess = req.session;
    if ( !sess.taches ) {
        sess.taches = [];
    }
    if ( req.body.ajout_input.length > 2 ) {
        sess.taches.push(req.body.ajout_input);
    }

    return res.redirect('/todolist?ajout_succ=1');
});

app.post('/supprimer', function(req,res) {

    sess = req.session;
    if ( !sess.taches ) {
        sess.taches = [];
        var errval = encodeURIComponent('1');
        return res.redirect('/todolist?supp_err=' + errval);
    }
    let ch = req.body.suppr_input;
    let index = sess.taches.indexOf(ch);
    if (index > -1) {
       sess.taches.splice(index, 1);
    } else {
        // j'envoie une erreur
        var errval = encodeURIComponent('1');
        return res.redirect('/todolist?supp_err=' + errval);
    }

    return res.redirect('/todolist');
});

app.listen(PORT);