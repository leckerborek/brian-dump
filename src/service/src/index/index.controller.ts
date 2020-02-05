import { Controller, Body, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { IndexService } from './index.service';
import { IndexUrlRequestDto } from './models/indexUrlRequestDto';
import { IndexResponseDto } from './models/IndexResponseDto';
import { FileInterceptor } from '@nestjs/platform-express'
import { MulterFile } from './models/multerFile';
import { promises as fs } from 'fs';
import { SearchService } from 'src/search/search.service';

async function loadMonoCounter() {

}
@Controller('index')
export class IndexController {
    constructor(
        private readonly indexService: IndexService,
        private readonly searchService: SearchService) { }

    @Post()
    async index(@Body() request: IndexUrlRequestDto): Promise<IndexResponseDto> {
        console.table(request);
        
        const success = await this.indexService.extract(request.url);
        return {
            success: success
        };
    }

    @Post('file')
    @UseInterceptors(FileInterceptor('file'))
    async file(@UploadedFile() file: MulterFile)
    {
        if (!file)
        {
            return { status: 'nope...'}
        }

        console.table(file);

        const data = await fs.readFile(file.path, 'binary');
        const buffer = Buffer.from(data);
        const base64 = buffer.toString('base64');

        await this.searchService.index({
            origin: 'file',
            title: '',
            content: '',
            blob: base64
        })

        return { status: 'yes!', ...file }
    }

    @Post('content')
    async content(@Body() request: IndexUrlRequestDto): Promise<IndexResponseDto> {
        console.table(request);
        return { success: true }
    }
}
