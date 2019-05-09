Component({
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
