import menusInfo from '../../libs/menu-info.nodepower';

const menus = menusInfo.map(({ id, pages }) => {
    const alias = {
        plugin: '插件',
        comps: '组件',
    };

    return {
        id,
        pages,
        open: false,
        name: alias[id] || id,
    };
});

Page({
    data: {
        list: menus,
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
