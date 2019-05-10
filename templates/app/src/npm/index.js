const beautywe = require('@beautywe/core');
const storage = require('@beautywe/plugin-storage');
const event = require('@beautywe/plugin-event');
const listpage = require('@beautywe/plugin-listpage');

module.exports = {
    beautywe,
    plugin: {
        storage,
        event,
        listpage: listpage.default,
    },
};
