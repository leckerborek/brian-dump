import { CreateItemDto } from './item';
import { ItemsService } from './items.service';
import { WebContent } from '../models/webContent';
import { SearchService } from 'src/search/search.service';
import { SearchResult } from 'src/models/searchResult';
export declare class ItemsController {
    private readonly itemsService;
    private readonly searchService;
    constructor(itemsService: ItemsService, searchService: SearchService);
    find(query: string): Promise<SearchResult[]>;
    find2(): Promise<string>;
    create(item: CreateItemDto): Promise<WebContent>;
}
