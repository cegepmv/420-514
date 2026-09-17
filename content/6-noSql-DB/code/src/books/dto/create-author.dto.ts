// create-author.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  author_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
