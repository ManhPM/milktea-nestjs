import { IsNotEmpty } from 'class-validator';

export class CreateTempAccountDto {
  @IsNotEmpty({ message: 'Tên không được bỏ trống' })
  name: string;
  @IsNotEmpty({ message: 'Số điện thoại không được bỏ trống' })
  phone: string;
  @IsNotEmpty({ message: 'Email không được bỏ trống' })
  email: string;
  @IsNotEmpty({ message: 'Mật khẩu không được bỏ trống' })
  password: string;
  activeId: number;
}
