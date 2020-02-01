import { SearchService } from 'src/search/search.service';
import { ItemsService } from 'src/items/items.service';
export declare class DebugController {
    private readonly items;
    private readonly search;
    constructor(items: ItemsService, search: SearchService);
    generate(): Promise<void>;
}
