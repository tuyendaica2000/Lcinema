import { FC, LazyExoticComponent } from "react";

export default interface Route {
    path: string,
    components: LazyExoticComponent<FC>
}
