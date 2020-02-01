import { Controller, Body, Post } from '@nestjs/common';
import { IndexService } from './index.service';
import { IndexUrlRequest } from './indexUrlRequest';
import { IndexResponse } from './indexResponse';

@Controller('index')
export class IndexController {
    constructor(private readonly indexService: IndexService) { }

    @Post()
    async index(@Body() request: IndexUrlRequest): Promise<IndexResponse> {
        console.table(request);
        const success = await this.indexService.extract(request.url);
        
        return {
            success: success
        };
    }
}
