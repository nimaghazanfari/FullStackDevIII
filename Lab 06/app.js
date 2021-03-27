const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const musicFactory = require('./modules/musicFactory');

const app = express();

app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(express.static("public"));
app.use('/', indexRouter);
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

//Listen on port 3000
const hostname = "127.0.0.1";
const port = 3000;

server = app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


//musicFactory module
musicFactory.init();
musicFactory.getMusicData();
musicFactory.addFavorite(1);
musicFactory.addFavorite(5);
musicFactory.downloadSong(10);
musicFactory.filterMusic('Hard Rock');
musicFactory.filterMusic('Country Rock');
musicFactory.filterMusic('Hip Hop');
musicFactory.filterMusic('Hard Rock', 'Journey');
musicFactory.filterMusic('', 'Jason Aldean');

//express endpoints
app.get('/musicData', (req, res) => {
    res.status(200)
       .json(musicFactory.getMusicDataV2());
});

app.get('/filterMusic', (req, res) => {
    var
        genre = req.query.genre,
        band = req.query.band,
        title = req.query.title,
        album = req.query.album;

    res.status(200)
       .json(musicFactory.filterMusicV2(genre, band, title, album));
});

app.get('/favorite/:id', (req, res) => {
    var id = req.params.id;

    res.status(200)
       .json(musicFactory.addFavoriteV2(id));
});

app.get('/remove-favorite/:id', (req, res) => {
    var id = req.params.id;

    res.status(200)
       .json(musicFactory.removeFavoriteV2(id));
});

app.post('/download', (req, res) => {
    var id = req.body.id;

    res.status(200)
       .json(musicFactory.downloadSongV2(id));
});