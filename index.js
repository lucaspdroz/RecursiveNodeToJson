const fs = require('fs');
const path = require('path');
const { resolve } = require('path');
const { readdir } = require('fs').promises;

const fileName = "videos_list"

// let video = {
//     name: '',
//     duration: '',
//     path: '',
// };

async function getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });

    console.log(dirents);
    const files = await Promise.all(dirents.map((dirent) => {
        const res = resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

getFiles(__dirname)
    .then(files => jsonFileCreate(files))
    .catch(e => console.error(e));


function jsonFileCreate(path) {
    let data = JSON.stringify(path, null, 2);
    fs.writeFile(`${fileName}.json`, data, (err) => {
        if (err) throw err;
        console.log('Data written to file\n');
        console.log(`Finished and the file name is: ${fileName}.json`);
    });
}

