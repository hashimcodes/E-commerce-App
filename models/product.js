const { json } = require('express/lib/response');
const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getDataFromFile = callBack => {
    fs.readFile(p, (err, fileData) => {
        if (err) callBack([]);
        else callBack(JSON.parse(fileData));
    });
}

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        getDataFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) console.log(err);
            });
        });
    }

    static fetchAll(callBack) {
        getDataFromFile(callBack);
    }
}