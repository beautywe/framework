Page({
    data: {
        // TODO 使用 json-compile 通过 node 来读取文件夹实现。
        list: [{
            id: 'plugin',
            name: '插件',
            open: false,
            pages: [
                'listpage',
            ],
        }, {
            id: 'base-component',
            name: '基础组件',
            open: false,
            pages: [
                'copyright',
                'loading',
            ],
        }],
        // you can extend your business components demo here...
    },
    toggle(e) {
        const id = e.currentTarget.id;
        const list = this.data.list;
        for (let i = 0, len = list.length; i < len; i += 1) {
            if (list[i].id === id) list[i].open = !list[i].open;
            else list[i].open = false;
        }
        this.setData({ list });
    },
});
