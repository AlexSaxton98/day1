const fs = require("fs");
const path = require("path");
const { nanoid, customAlphabet } = require("nanoid");
const dataPath = path.join(process.env.DATA_LOCATION, "data.json");

const saveData = (data) => {
    try {
        if (!fs.existsSync(process.env.DATA_LOCATION)) {
            fs.mkdirSync(process.env.DATA_LOCATION);
        }

        fs.writeFileSync(dataPath, JSON.stringify(data));
    } catch(error) {
        console.log(error);
    }
};

const loadData = () => {
    try {
        return JSON.parse(fs.readFileSync(dataPath).toString());
    } catch(error) {
        return [];
    }
};

const makeID = () => customAlphabet(process.env.CHARACTERS, parseInt(process.env.LENGTH))();

const add = (title, artist, album, id = false) => saveData([...loadData(), {id: id || makeID(), title, artist, album}]);

const list = () => console.log(loadData());

const update = (id, title, artist, album) => {
    const song = remove(id);
    add(title || song.title, artist || song.artist, album || song.album, id);
};

const remove = (id) => {
    const songs = loadData();
    const song = songs.find((song) => song.id === id);
    const matchSong = (song) => song.id !== id;
    saveData(songs.filter(matchSong));
    return song;
};

module.exports = {add, list, update, remove};
