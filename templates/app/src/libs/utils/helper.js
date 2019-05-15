export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function getCurrentPage() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
}

export function getGlobalView(curPage) {
    return curPage.selectComponent('#global-view');
}
