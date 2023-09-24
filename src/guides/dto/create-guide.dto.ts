import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateGuideDto {
  @IsNotEmpty({ message: 'Tên hướng dẫn viên không được để trống' })
  name: string;
  @IsNotEmpty({ message: 'Ảnh hướng dẫn viên không được để trống' })
  photo: string;
  @IsNotEmpty({ message: 'Email hướng dẫn viên không được để trống' })
  @IsEmail()
  email: string;
  @IsNotEmpty({ message: 'Ngôn ngữ của hướng dẫn viên không được để trống' })
  languages: string;
  @IsNotEmpty({ message: 'Ảnh hướng dẫn viên không được để trống' })
  phoneNumber: string;

  description: string;
}
