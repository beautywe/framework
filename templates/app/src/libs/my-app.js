import { beautywe } from '../npm/index';
import config from '../config/index';
import storage from './plugins/storage';
import event from './plugins/event';

const { BtApp } = beautywe;

export default function (wxApp) {
    const myApp = new BtApp(wxApp);

    // Plugin integration
    myApp.use(storage);
    myApp.use(event);

    myApp.config = config;

    App(myApp);
}
