
module.exports = function plugin(options) {
    // 这里可以通过 options 做可配置化逻辑。
    const pluginName = '<%= pluginName %>';

    return {
        // 插件名
        name: pluginName,

        // 存放你的 data，会合并到 theHost.${pluginName}.name
        data: {
            name: pluginName,
        },

        // 原生生命周期钩子，会混合到 theHost.onShow
        nativeHook: {
            onShow() {

            },
        },

        // 视图层事件监听，会混合到 theHost.onClick
        handler: {
            onClick(event) {
                // 处理你的逻辑
            },
        },

        // 自定义方法，会合并到 theHost.${pluginName}.sayHello
        customMethod: {
            sayHello() {
                console.log('Hello!');
            },
        },

        // 插件装载前的钩子
        beforeAttach({ theHost }) {
            console.log(`plugin(${pluginName}) will be attaching`, { theHost });
        },

        // 插件装载完的钩子
        attached({ theHost }) {
            console.log(`plugin(${pluginName}) was attached`, { theHost });
        },

        // 插件初始化方法，会在宿主启动的时候执行
        initialize({ theHost }) {
            console.log(`plugin(${pluginName}) has initialized`, { theHost });
        },
    };
};
