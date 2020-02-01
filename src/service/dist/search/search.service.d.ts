import { WebContent } from 'src/models/webContent';
import { SearchResult } from 'src/models/searchResult';
export declare class SearchService {
    private client;
    index(data: WebContent): Promise<void>;
    search(query: string): Promise<SearchResult[]>;
    example(): Promise<void>;
}
