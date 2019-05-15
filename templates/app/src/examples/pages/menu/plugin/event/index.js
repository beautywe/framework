import MyPage from '../../../../../libs/my-page';
import { sleep } from '../../../../../libs/utils/helper';

MyPage({
    onLoad() {
        console.log('on page load');
    },
    jumpNewPageAndLoadPage() {
        wx.navigateTo({
            url: 'other/index',
        });

        return Promise
            .resolve()
            .then(() => sleep(2000))
            .then(() => {
                const ranId = Math.floor(Math.random() * 300);
                this.setData({
                    image: `https://picsum.photos/id/${ranId}/400/300`,
                }, () => {
                    getApp().event.trigger('imageloaded');
                });
            });
    },
});
