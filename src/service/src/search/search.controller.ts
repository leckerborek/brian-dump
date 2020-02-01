import { Controller, Get, Post, Body } from '@nestjs/common';
import { SearchRequest } from '../../../shared/model/searchRequest';
import { SearchResponse } from '../../../shared/model/searchResponse';

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
