import { Controller, Get, Req, Res, Post, Body, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateItemDto } from './item';
import { ItemsService } from './items.service';
import { WebContent } from '../models/webContent';
import { SearchService } from 'src/search/search.service';
import { SearchResult } from 'src/models/searchResult';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService, private readonly searchService: SearchService) {}

    @Get()
    async find(@Query() query: string): Promise<SearchResult[]> {
        const results = await this.searchService.search(query);
        return results;
    }

    @Get()
    async find2(): Promise<string> {
        return 'find2 will return everything!';
    }

    @Post()
    async create(@Body() item: CreateItemDto): Promise<WebContent> {
        console.table(item);
        const result = await this.itemsService.extract(item.url);
        return result;
    }
}
