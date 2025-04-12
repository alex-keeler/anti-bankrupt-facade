import '../scss/banner.scss';
import {BannerMessage} from "../state/BannerMessage.ts";

export default function Banner(props: { message: BannerMessage }) {
    return (
        <div className={"banner banner--" + props.message.type}>{props.message.message}</div>
    )
}