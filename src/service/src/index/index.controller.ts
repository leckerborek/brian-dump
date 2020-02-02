import { Controller, Body, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { IndexService } from './index.service';
import { IndexUrlRequestDto } from './models/indexUrlRequestDto';
import { IndexResponseDto } from './models/IndexResponseDto';
import { FileInterceptor } from '@nestjs/platform-express'
import { MulterFile } from './models/multerFile';

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

    @Post('file')
    @UseInterceptors(FileInterceptor('file'))
    async file(@UploadedFile() file: MulterFile)
    {
        if (!file)
        {
            return { status: 'nope...'}
        }

        console.table(file);
        return { status: 'yes!', ...file }
    }
}
