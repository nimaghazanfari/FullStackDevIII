
const arr = [];
const favorites = [];
let _id = 0;

class Song {
    constructor(band, title, duration, albulm, rating, genre, image) {
        _id = _id + 1;
        this.id = _id;
        this.band = band;
        this.title = title;
        this.duration = duration;
        this.albulm = albulm;
        this.rating = rating;
        this.genre = genre;
        this.imageName = image;
    }
}

const init = () => {
    arr.push(new Song("Journey", "Don't Stop Believing", "3:50", "Greatest Hits", "5", "Hard Rock", "Journey.JPG"));
    arr.push(new Song("Def Leppard", "Photograph", "3:50", "Histeria", 5, "Hard Rock", "Def-Lepard.JPG"));
    arr.push(new Song("Kiss", "Lord of Thunder", "5:53", "Destroyer", 5, "Hard Rock", "Kiss.JPG"));
    arr.push(new Song("Ozzy Osbourne", "Crazy Train", "4:56", "Blizzard of Oz", 5, "Hard Rock", "Blizzard-Of-Oz.jpg"));
    arr.push(new Song("Guns N Roses", "Paridise City", "6:46", "Greatest Hits", 5, "Hard Rock", "Guns-Roses.JPG"));
    arr.push(new Song("Scorpions", "Big City Nights", "4:12", "Love At First Sting", 5, "Hard Rock", "Love-At-First-Sting.jpg"));
    arr.push(new Song("Whitesnake", "Still of the Night", "6:39", "Whitesnake", 5, "Hard Rock", "White-Snake.jpg"));
    arr.push(new Song("Motley Crue", "Too Fast For Love", "5:33", "Motley Crue", 5, "Hard Rock", "Motley-Crue.JPG"));
    arr.push(new Song("Jason Aldean", "Dirt Road Anthem", "3:49", "My Kind of Party", 4, "Country Rock", "My-Kind-Of-Party.jpg"))
    arr.push(new Song("Hardy", "My Kind of Living", "3:19", "HixTape Vol 1", 4, "Country Rock", "Hix-Tape.jpg"))
    arr.push(new Song("Jason Aldean", " Tattoos an Tequila", "4:44", "We Back", 4, "Country Rock", "We-Back.jpg"))
    arr.push(new Song("Eric Church", "Springsteen", "3:35", "Chief", 4, "Country Rock", "Chief.jpg"))
    arr.push(new Song("Kip Moore", "Wild Ones", "3:23", "Wild Ones", 4, "Country Rock", "Wild-Ones.jpg"))
    arr.push(new Song("The Cadillac Three", "Tabasco & Sweet Tea", "4:40", "Tabasco & Sweet Tea", 4, "Country Rock", "The-Cadillac-Three.jpg"))
    arr.push(new Song("2 Pac", "All Eyez On Me", "4:33", "All Eyez On Me", 5, "Hip Hop", "2-Pac.jpg"))

    console.log('Init Called - music data created..');
}

const getMusicData = () => {
    console.log('Music data list has a length:', arr.length);
}

const addFavorite = id => {
    const item = findSingleSong(id);
    if (item) console.log(`Add favorite song - id: ${item.id}, artist: ${item.band}, title: ${item.title}`);
    else console.log('Nothing found!');
}

const downloadSong = id => {
    const item = findSingleSong(id);
    if (item) console.log(`Download song - id: ${item.id}, artist: ${item.band}, title: ${item.title}`);
    else console.log('Nothing found!');
}

const filterMusic = (genre, band, title, album) => {
    const filtered = arr.filter(item => {
        if (genre && item.genre != genre) return false;
        if (band && item.band != band) return false;
        if (title && item.title != title) return false;
        if (album && item.albulm != album) return false;
        return true;
    });

    console.log(`filtered ${filtered.length}, with genre: ${genre}, band: ${band}, title: ${title}, album: ${album}`);
}

const getMusicDataV2 = () => {
    return arr;
}

const addFavoriteV2 = id => {
    const item = findSingleSong(id);
    //push item to the favorites 
    if (item && !favorites.find(a => a.id == id)) favorites.push(item);
    return favorites;
}

const removeFavoriteV2 = id => {
    const idx = favorites.findIndex(a => a.id == id);
    
    if (idx > -1) favorites.splice(idx, 1);
    return favorites;
}

const downloadSongV2 = id => {
    return findSingleSong(id);
}

const filterMusicV2 = (genre, band, title, album) => {

    const filtered = arr.filter(item => {
        if (genre && item.genre != genre) return false;
        if (band && item.band != band) return false;
        if (title && item.title != title) return false;
        if (album && item.albulm != album) return false;
        return true;
    });

    return filtered;
}

const findSingleSong = id => arr.find(item => item.id == id);

module.exports = {
    init: init,
    getMusicData: getMusicData,
    addFavorite: addFavorite,
    downloadSong: downloadSong,
    filterMusic: filterMusic,

    getMusicDataV2: getMusicDataV2,
    addFavoriteV2: addFavoriteV2,
    removeFavoriteV2: removeFavoriteV2,
    downloadSongV2: downloadSongV2,
    filterMusicV2: filterMusicV2
}