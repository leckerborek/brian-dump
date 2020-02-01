import { SearchModel } from './searchModel';
import { ShortWebContent } from './shortWebContent';

export interface SearchResult extends ShortWebContent {
    score: number;
    uid: string;
    origin: string;
}
