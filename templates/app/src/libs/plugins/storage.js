import { plugin } from '../../npm/index';
import config from '../../config/index';

const storage = plugin.storage({
    // day
    expire: 7,

    appVersion: config.appInfo.version,
});

export default storage;
