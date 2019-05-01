import { beautywe } from '../npm/index';

const { BtPage } = beautywe;

export default function (wxPage) {
    const myPage = new BtPage(wxPage);
    Page(myPage);
}
