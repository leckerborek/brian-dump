import { Content } from "./webContent";

export type SearchModel = Content & {
    uid: string;
    created: string;
    lang: string;
}