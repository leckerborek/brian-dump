import { Controller, Get, Post, Body } from '@nestjs/common';
import { SearchRequest } from 'src/models/searchRequest';
import { SearchResponse } from 'src/models/searchResponse';

@Controller('search')
export class SearchController {

    @Post()
    async search(@Body() request: SearchRequest): Promise<SearchResponse> {
        return {
            score: 1,
            title: 'hello',
            content: 'penis'
        }
    }
}
