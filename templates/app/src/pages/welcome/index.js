import MyPage from '../../libs/my-page';
import { getGlobalView, sleep } from '../../libs/utils/helper';

MyPage({
    onLoad() {
        // the demo just for show
        const globalView = getGlobalView(this);
        return Promise
            .resolve()
            .then(() => globalView.showLoading())
            .then(() => sleep(2000))
            .then(() => globalView.hideLoading());
    },
});
