import { Controller, Get } from '@nestjs/common';

@Controller('items')
export class ItemsController {
    @Get()
    findAll() {
        return 'this will return everything!'
    }
}
