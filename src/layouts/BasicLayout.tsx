import {Outlet} from "react-router-dom";

export default function BasicLayout() {
    return (
        // TODO: anything but this
        <div style={{padding: 50}}>
          <Outlet/>
        </div>
    );
}