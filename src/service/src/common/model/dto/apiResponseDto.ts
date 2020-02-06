import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto {
    @ApiProperty() success: boolean;
}
