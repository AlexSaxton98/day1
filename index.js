require("dotenv").config();

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv)).argv;
const {add, list, update, remove} = require("./utils/");

const main = () => {
    if (argv.add) {
        add(argv.title, argv.artist, argv.album);
    } else if (argv.update) {
        update(argv.id, argv.title, argv.artist, argv.album);
    } else if (argv.list) {
        list(argv.title, argv.artist, argv.album);
    } else if (argv.remove) {
        remove(argv.id);
    }
}

main();
