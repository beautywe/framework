import MyPage from '../../../../libs/my-page';
import { plugin, beautywe } from '../../../../npm/index';

const myPage = new beautywe.BtPage({
    data: {
        name: 'listpage',
    },
    onLoad() {
        // 手动加载页面数据
        const picturesList = this.listPage.getList('pictures');

        // 获取下一页数据，并同步数据到 data
        picturesList.nextPage().then(() => picturesList.updateData());
    },
});

myPage.use(plugin.listpage({
    lists: [{
        name: 'pictures',  // 数据名
        pageSize: 5,   // 每页多少条数据，默认 10

        // 每一页的数据源，没次加载页面时，会调用函数，然后取返回的数据。
        fetchPageData({ pageNo, pageSize }) {
            const pictures = Array(pageSize).fill(null).map((value, index) => `https://picsum.photos/id/${pageSize * pageNo + index}/400/300`);
            return Promise.resolve(pictures);
        },
    }],
    onPullDownRefresh: true,    // 开启下拉重载， 默认 false
    onReachBottom: true,    // 开启上拉加载， 默认 false
}));

MyPage(myPage);
