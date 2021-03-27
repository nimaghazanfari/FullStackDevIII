//// Constants and variables

let searchResultsContainer = null;
let favoriteListContainer = null;
let txtGenre = null;
let txtArtist = null;
let txtSong = null;
let txtAlbum = null;
let _id = 0;

class Song {
    constructor(band, title, duration, albulm, rating, genre, image) {
        _id = _id + 1;
        this.id = _id;
        this.band = band,
            this.title = title;
        this.duration = duration;
        this.albulm = albulm;
        this.rating = rating;
        this.genre = genre;
        this.imageName = image;
    }
}

const hasSearchFilters = () => {
    return txtArtist.value || txtSong.value || txtAlbulm.value || txtGenre.value;
}
const doesPropEqualsText = (input, property) => {
    return !input.value || property.toLowerCase().includes(input.value.toLowerCase());
}


//// EVENT HANDLERS
const handleSearch = () => {
    console.log('handle search');

    filterAndLoadResults();
}

const handleInputKeyUp = (e) => {
    console.log('handle input key up');
    // Number 13 is the "Enter" key on the keyboard
    if (e.keyCode === 13) {
        // Cancel the default action, if needed
        e.preventDefault();

        filterAndLoadResults();
    }
}

const filterAndLoadResults = () => {

    if (!hasSearchFilters()) {
        alert('Please select a search filter');
        return;
    }

    let genre = txtGenre.value;
    let band = txtArtist.value;
    let title = txtSong.value;
    let album = txtAlbulm.value;

    let url = '/filterMusic?';
    let useAnd = false;
    if (genre) {
        url += `genre=${genre}`;
        useAnd = true;
    }
    if (band) {
        url += `${useAnd ? '&' : ''}band=${band}`;
        useAnd = true;
    }
    if (title) {
        url += `${useAnd ? '&' : ''}title=${title}`;
        useAnd = true;
    }
    if (album) {
        url += `${useAnd ? '&' : ''}album=${album}`;
    }
    //fetch from API
    fetch(url)
        .then(res => res.json())
        .then(res => loadData(res));

}
const handleReset = () => {
    console.log('handle reset');
    txtGenre.value = null;
    txtArtist.value = null;
    txtSong.value = null;
}


const handleFavoriteClick = (id) => {

    //fetch from API
    fetch(`/favorite/${id}`)
        .then(res => res.json())
        .then(res => {
            if (!res) {
                console.warn(`song ${id} not found, cannot add to favorties`);
                return;
            }

            createFavoriteImage(res);
            console.log(res)
        });
}


const handleDownloadClick = (id) => {

    //fetch from API
    fetch(`/download`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    })
        .then(res => res.json())
        .then(res => {
            if (!res) {
                console.warn(`song ${id} not found, cannot add to favorties`);
                return;
            }
            alert(`downloaded: ${res.band}`);
            console.log(res)
        })
        .catch(err => console.log(err));
}

const handleRemoveFavoriteClick = (e) => {
    //fetch from API
    fetch(`/remove-favorite/${e.target.id}`)
        .then(res => res.json())
        .then(res => {
            if (!res) {
                console.warn(`song ${id} not found, cannot remove from favorties`);
                return;
            }

            createFavoriteImage(res);
            console.log(res)
        });
}
const handleSongButtonClick = (e) => {
    if (!e.target) {
        return;
    }

    if (e.target.className === 'btn-favorite') {
        console.log('favorite button click');
        handleFavoriteClick(e.target.getAttribute("data-key"));
    }
    else if (e.target.className === 'btn-download')
        handleDownloadClick(e.target.getAttribute('data-key'));

    console.log(e.target.getAttribute("data-key"));

}
const setupHandlers = () => {
    getElement('#btnSearch').addEventListener('click', handleSearch);
    getElement('#btnReset').addEventListener('click', handleReset);
    getAllElements('input')
        .forEach(input => input.addEventListener('keyup', handleInputKeyUp));

    getElement('#searchResults').addEventListener('click', handleSongButtonClick);
    getElement('#favoriteListContainer').addEventListener('click', handleRemoveFavoriteClick);
}


const loadData = (data) => {
    removeTableRows();

    for (const song of data) {
        console.log(song);
        const songRow = buildTableRow(song);
        searchResultsContainer.append(songRow);
    }
}

//// DOM Manipulation & Traversal /////
const getElement = (selector) => {
    return document.querySelector(selector);
}
const getAllElements = (selector) => {
    return document.querySelectorAll(selector);
}

const removeTableRows = () => {
    while (searchResultsContainer.firstChild) {
        searchResultsContainer.removeChild(searchResultsContainer.firstChild);
    }
}

const buildTableRow = (songObj) => {
    const row = createElement('tr');
    for (const key in songObj) {
        if (key === 'id' || key === 'imageName') continue;
        const colTitle = createElement('td', songObj[key]);
        row.append(colTitle);
    }
    const liFaDownload = createElement('li', null, "fas fa-download");
    createButtonColumn(row, 'Favorite', 'btn-favorite', songObj.id, liFaDownload);
    createButtonColumn(row, 'Download', 'btn-download', songObj.id, liFaDownload);

    return row;
}


const createFavoriteImage = (songs) => {
    //removing all children
    while (favoriteListContainer.firstChild) favoriteListContainer.removeChild(favoriteListContainer.lastChild);

    songs.forEach(song => {
        const imageName = song.imageName;
        const imgFilePath = `images\\${imageName}`;
        const imgElement = createElement('img', null, 'favorite-albulm-item', null, null, song.id);
        imgElement.src = imgFilePath;
        favoriteListContainer.append(imgElement);
    })

}

const createButtonColumn = (rowElement, text, className, key, innerHtml) => {
    const buttonCol = createElement('td', null, null, key);
    const btnElement = createElement('button', text, className, key, innerHtml);
    buttonCol.append(btnElement);

    rowElement.append(buttonCol);
}
const createElement = (element, text, className, key, innerHtml, id) => {
    let elm = document.createElement(element);
    if (text)
        elm.textContent = text;
    if (className)
        elm.className = className;
    if (key)
        elm.dataset.key = key; //setAttribute("data-num", i);
    if (innerHtml)
        elm.innerHtml = innerHtml.outerHtml;
    if (id)
        elm.id = id;
    return elm;
}

const inititalize = () => {
    searchResultsContainer = document.querySelector('#searchResults');
    favoriteListContainer = document.querySelector('#favoriteListContainer')
    txtGenre = document.querySelector('#txtGenre');
    txtArtist = document.querySelector('#txtArtist');
    txtSong = document.querySelector('#txtSong');
    txtAlbum = document.querySelector('#txtAlbum');

    //just to update favorites
    handleFavoriteClick();
}
/// Window Load
window.onload = () => {
    console.log('window loaded..');
    setupHandlers();
    inititalize();
}