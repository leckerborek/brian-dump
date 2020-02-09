import { ApiProperty } from '@nestjs/swagger';

export class IndexUrlRequestDto {
    @ApiProperty() url: string;
}
