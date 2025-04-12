import {Outlet, useOutletContext} from "react-router-dom";
import {BannerMessage} from "../state/BannerMessage.ts";
import {Dispatch, SetStateAction, useState} from "react";
import Banner from "../components/Banner.tsx";

type SetBannerMessageContext = { setBannerMessage: Dispatch<SetStateAction<BannerMessage | undefined>> };

export default function LoginLayout() {

    const [bannerMessage, setBannerMessage] = useState<BannerMessage | undefined>(undefined);

    return (
        <>
            { bannerMessage && <Banner message={bannerMessage}/> }
            {/*TODO: anything but this*/}
            <div style={{padding: 50}}>
                <Outlet context={{ setBannerMessage }}/>
            </div>
        </>
    );
}

export function useSetBannerMessage() {
    return useOutletContext<SetBannerMessageContext>();
}