const fs = require("fs");
const { nanoid, customAlphabet } = require("nanoid");

const saveData = (data) => {
    try {
        fs.writeFileSync("data.json", JSON.stringify(data));
    } catch(error) {
        console.log(error);
    }
};

const loadData = () => {
    try {
        return JSON.parse(fs.readFileSync("data.json").toString());
    } catch(error) {
        return [];
    }
};

const makeID = () => customAlphabet("0123456789abcdef", 10)();

const add = (title, artist, album, id = false) => saveData([...loadData(), {id: id || makeID(), title, artist, album}]);

const list = (title, artist, album) => console.log(loadData());

const update = (id, title, artist, album) => {
    remove(id);
    add(title, artist, album, id);
};

const remove = (id) => {
    const matchSong = (song) => song.id !== id;
    const songs = loadData();
    saveData(songs.filter(matchSong));
};

module.exports = {add, list, update, remove};
