require("dotenv").config();

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { Sequelize, DataTypes } = require("sequelize");

const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

const Song = connection.define("Song", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    artist: {
        type: DataTypes.STRING,
        allowNull: false
    },

    album: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    indexed: [{unique: true, fields: ["title"]}]
});

const argv = yargs(hideBin(process.argv)).argv;
const {add, list, update, remove} = require("./utils/");

const main = async () => {
    try {
        await connection.authenticate();
        await Song.sync({alter: true});
        console.log(`Connection to ${process.env.DB_HOST} established.`);
    } catch (error) {
        console.error(`Unable to connect to the DB: ${error}`);
    }

    if (argv.add) {
        const song = Song.build({title: argv.title, artist: argv.artist, album: argv.album});
        await song.save();
    } else if (argv.list) {
        const songs = await Song.findAll();
        console.log("\n");
        for(song of songs) {
            console.log(`Title:\t${song.title}\nArtist:\t${song.artist}\nAlbum:\t${song.album}\n\n`);
        }
    }

    /*
    if (argv.add) {
        add(argv.title, argv.artist, argv.album);
    } else if (argv.update) {
        update(argv.id, argv.title, argv.artist, argv.album);
    } else if (argv.list) {
        list(argv.title, argv.artist, argv.album);
    } else if (argv.remove) {
        remove(argv.id);
    }
    */

    await connection.close();
    process.exit();
}

main();
