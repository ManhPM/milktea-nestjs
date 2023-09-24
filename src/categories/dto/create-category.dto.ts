import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Tên loại tour không được bỏ trống' })
  name: string;
  @IsNotEmpty({ message: 'Mô tả không được bỏ trống' })
  description: string;
}
