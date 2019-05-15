import { beautywe } from '../npm/index';
import config from '../config/index';
import storage from './plugins/storage';
import event from './plugins/event';
import logger from './plugins/logger';

const { BtApp } = beautywe;

export default function (wxApp) {
    const myApp = new BtApp(wxApp);

    // plugin integration
    myApp.use(storage);
    myApp.use(event);
    myApp.use(logger);

    // make config global
    myApp.config = config;

    App(myApp);
}
