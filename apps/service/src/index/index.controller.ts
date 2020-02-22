import { Controller, Body, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { IndexService } from './index.service';
import { IndexUrlRequestDto } from './models/indexUrlRequestDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFile } from './models/multerFile';
import { promises as fs } from 'fs';
import { SearchService } from 'src/search/search.service';
import { ApiResponse } from '@elastic/elasticsearch';
import { ApiResponseDto } from 'src/common/model/dto/apiResponseDto';
import { IndexContentRequestDto } from './models/IndexContentRequestDto';

async function loadMonoCounter() {}
@Controller('index')
export class IndexController {
    constructor(private readonly indexService: IndexService, private readonly searchService: SearchService) {}

    @Post()
    async index(@Body() request: IndexUrlRequestDto): Promise<ApiResponseDto> {
        console.table(request);

        const success = await this.indexService.extract(request.url);
        return {
            success: success
        };
    }

    @Post('file')
    @UseInterceptors(FileInterceptor('file'))
    async file(@UploadedFile() file: MulterFile): Promise<ApiResponseDto> {
        if (!file) {
            return { success: false };
        }

        console.table(file);

        const data = await fs.readFile(file.path, 'binary');
        const buffer = Buffer.from(data);
        const base64 = buffer.toString('base64');

        await this.searchService.index({
            origin: undefined,
            title: file.originalname,
            content: 'todo: process in es',
            blob: base64,
            mimeType: file.mimetype,
            originalname: file.originalname,
        });

        return { success: true, ...file };
    }

    @Post('content')
    async content(@Body() request: IndexContentRequestDto): Promise<ApiResponseDto> {
        console.table(request);

        await this.searchService.index({
            origin: undefined,
            title: request.title,
            content: request.content
        });

        return { success: true };
    }
}
