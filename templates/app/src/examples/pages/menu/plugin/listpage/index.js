import MyPage from '../../../../../libs/my-page';
import { plugin, beautywe } from '../../../../../npm/index';
import { getGlobalView, sleep } from '../../../../../libs/utils/helper';

const myPage = new beautywe.BtPage({});

myPage.use(plugin.listpage({
    lists: [{

         // 数据名
        name: 'pictures',

        // 每页多少条数据，默认 10
        pageSize: 5,

        // 每一页的数据源，没次加载页面时，会调用函数，然后取返回的数据。
        fetchPageData({ pageNo, pageSize, theHost }) {
            const globalView = getGlobalView(theHost);
            const pictures = Array(pageSize).fill(null).map((value, index) => `https://picsum.photos/id/${pageSize * pageNo + index + 10}/400/300`);
            return Promise
                .resolve(pictures)
                .then(() => globalView && globalView.showLoading())
                .then(() => sleep(1000))
                .then(() => globalView && globalView.hideLoading())
                .then(() => pictures);
        },
    }],

    // 开启下拉重载， 默认 false
    enabledPullDownRefresh: true,

    // 开启上拉加载， 默认 false
    enabledReachBottom: true,
}));

MyPage(myPage);
