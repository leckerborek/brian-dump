import { WebContent } from '../models/webContent';
import { SearchService } from 'src/search/search.service';
export declare class ItemsService {
    private readonly searchService;
    constructor(searchService: SearchService);
    extract(url: string): Promise<WebContent>;
}
