import { Controller, Body, Post } from '@nestjs/common';
import { IndexService } from './index.service';
import { IndexUrlRequestDto } from './models/indexUrlRequestDto';
import { IndexResponseDto } from './models/IndexResponseDto';

@Controller('index')
export class IndexController {
    constructor(private readonly indexService: IndexService) { }

    @Post()
    async index(@Body() request: IndexUrlRequestDto): Promise<IndexResponseDto> {
        console.table(request);
        const success = await this.indexService.extract(request.url);
        return {
            success: success
        };
    }
}
