import { ContentBase } from './contentBase';

export type SearchResultBase = ContentBase & {
    score: number;
    uid: string;
    origin: string;
    created: string;
}
