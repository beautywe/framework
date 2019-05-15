Component({
    externalClasses: ['my-global-view-class'],
    data: {
        loading: false,
    },
    methods: {
        showLoading() {
            this.setData({ loading: true });
        },
        hideLoading() {
            this.setData({ loading: false });
        },
    },
});
