const beautywe = require('@beautywe/core');
const storage = require('@beautywe/plugin-storage');
const event = require('@beautywe/plugin-event');

module.exports = {
    beautywe,
    plugin: {
        storage,
        event,
    },
};
