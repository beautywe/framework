// import { get, pick } from '../../../npm/index';

function transformByDataType(data, dataType) {
    if (dataType === 'object') return data;
    if (dataType === 'json') return JSON.stringify(data);
    if (dataType === 'string') return Object.keys(data).map(key => `${key}: ${data[key]}\n`).join(' ');
    return data;
}

Component({
    methods: {

        // 获取应用信息
        getAppInfo({ dataType } = {}) {
            const app = getApp();
            return app.getAppId().then((appId) => {
                const version = app.constant.VERSION;
                const kdtId = app.getKdtId();
                const buyerId = app.getBuyerId();
                const APPID = appId;
                const pages = this.getPagesData();
                const currentPage = pages[pages.length - 1];
                const options = JSON.stringify(currentPage.options);
                const appInfo = { version, kdtId, buyerId, APPID, route: currentPage.route, options };

                return transformByDataType(appInfo, dataType);
            });
        },

        // 获取系统信息
        getSysInfo({ dataType } = {}) {
            const sysInfo = wx.getSystemInfoSync();
            return transformByDataType(sysInfo, dataType);
        },

        // 获取构建信息
        getBuildInfo({ dataType } = {}) {
            const meta = get(getApp(), 'constant.meta');
            const info = {
                build_hash: get(meta, 'buildInfo.hash'),
                build_time: get(meta, 'buildInfo.time'),
                ENV: get(meta, 'ENV'),
                RUN_MODE: get(meta, 'RUN_MODE'),
                branch: get(meta, 'buildInfo.branch'),
            };

            return transformByDataType(info, dataType);
        },

        // 获取 APP 实例数据
        getAppData() {
            const app = getApp();
            const appData = pick(app, ['constant', 'globalData']);
            return appData;
        },

        // 获取页面实例数据
        getPagesData() {
            const pages = getCurrentPages();
            const pagesData = pages.map(page => pick(page, ['route', 'data', 'privateData', 'options']));
            return pagesData;
        },

        // 获取所有 stroage 数据
        getStorageData() {
            const storageInfo = wx.getStorageInfoSync();
            const storageData = storageInfo.keys.map(key => ({ [`${key}`]: wx.getStorageSync(key) }));
            return { storageInfo, storageData };
        },

        // 打开操作菜单
        showActionSheet() {
            const app = getApp();
            const actions = [
                { name: '日志上报', handler: this.feedbackException },
                { name: '系统信息', handler: this.showSysInfo },
                { name: '应用信息', handler: this.showAppInfo },
                { name: '构建信息', handler: this.showBuildInfo },
                { name: '清除缓存并重启', handler: app.clearStorageAndRelaunch.bind(app) },
                { name: 'Debug Tools', handler: this.openDebugTools },
            ];

            wx.showActionSheet({
                itemList: actions.map(action => action.name),
                success: (res) => {
                    const action = actions[res.tapIndex];
                    if (action.handler) {
                        action.handler.call(this);
                    }
                },
            });
        },

        // 展示应用信息
        showAppInfo() {
            this.getAppInfo({ dataType: 'string' }).then((appInfo) => {
                wx.showModal({
                    title: '应用信息',
                    content: appInfo,
                    confirmText: '复制',
                    success(res) {
                        if (res.confirm) {
                            wx.setClipboardData({
                                data: appInfo,
                            });
                        }
                    },
                });
            });
        },

        // 展示系统信息
        showSysInfo() {
            const sysInfo = this.getSysInfo({ dataType: 'string' });
            wx.showModal({
                title: '系统信息',
                content: sysInfo,
                confirmText: '复制',
                success(res) {
                    if (res.confirm) {
                        wx.setClipboardData({
                            data: sysInfo,
                        });
                    }
                },
            });
        },

        // 展示构建信息
        showBuildInfo() {
            const buildInfo = this.getBuildInfo({ dataType: 'string' });
            wx.showModal({
                title: '构建信息',
                content: buildInfo,
                confirmText: '复制',
                success(res) {
                    if (res.confirm) {
                        wx.setClipboardData({
                            data: buildInfo,
                        });
                    }
                },
            });
        },

        // 打开调试工具页面
        openDebugTools() {
            wx.navigateTo({
                url: '/pages/debug-tools/index',
            });
        },
    },
});
