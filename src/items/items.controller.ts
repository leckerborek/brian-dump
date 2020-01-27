import { Controller, Get, Req, Res, Post, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateItemDto } from './item';
import { ItemsService } from 'src/items.service';
import { WebContent } from './webContent';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    findAll(): string {
        //findAll(@Req() req: Request, @Res() res: Response) {
        //console.log(req.url);
        return 'this will return everything!';
    }

    @Post()
    async create(@Body() item: CreateItemDto): Promise<WebContent> {
        console.table(item);
        const result = await this.itemsService.extract(item.url);
        return result;
    }
}
