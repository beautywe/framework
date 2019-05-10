import { beautywe } from '../npm/index';

const { BtPage } = beautywe;

export default function (wxPage) {
    const myPage = wxPage instanceof BtPage ? wxPage : new BtPage(wxPage);

    // do your global logic for page here

    Page(myPage);
}
