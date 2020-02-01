import { Controller, Get, Post, Body } from '@nestjs/common';
import { SearchRequestDto } from 'src/search/models/searchRequestDto';
import { SearchResponseDto } from 'src/search/models/searchResponseDto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Post()
    async search(@Body() request: SearchRequestDto): Promise<SearchResponseDto[]> {
        const searchResult = await this.searchService.search(request.query);

        const result = searchResult.map((result) => {
            return {
                uid:  result.uid,
                title: result.title,
                content: result.content,
                score: result.score,
                origin: result.origin,
                created: result.created
            };
        });

        return result;
    }
}
