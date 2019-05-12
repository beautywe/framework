import MyPage from '../../../../../libs/my-page';

MyPage({
    data: {
        loading: false,
    },
    onLoad() {
        console.log('on page load');
    },
    show() {
        this.setData({ loading: true });
    },
    hide() {
        this.setData({ loading: false });
    },
});
