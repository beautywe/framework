import { BtApp } from '@beautywe/core';
import test from 'ava';
import <%= pluginName %> from '../src/plugin';

function newAppUseingPlugin() {
    const app = new BtApp();
    const plugin = <%= pluginName %>();
    app.use(plugin);
    app.onLaunch();

    return Promise
        .resolve()
        .then(() => app.onLaunch())
        .then(() => ({ app, plugin }));
}

test('use plugin', (t) => {
    return Promise
        .resolve()
        .then(() => newAppUseingPlugin())
        .then(({ app, plugin }) => {
            t.is(app._btPlugin.plugins[0].name, plugin.name);
            t.truthy(app[`${plugin.name}`]);
        });
});