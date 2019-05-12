import MyPage from '../../../../../../libs/my-page';

MyPage({
    onLoad() {
        console.log('on page load');

        getApp().event.on('imageloaded', () => {
            wx.showModal({
                title: '提示',
                content: '图片加载好啦，返回上一页看看吧',
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定');
                        wx.navigateBack({ delta: 1 });
                    } else if (res.cancel) {
                        console.log('用户点击取消');
                    }
                },
            });
        });
    },
});
