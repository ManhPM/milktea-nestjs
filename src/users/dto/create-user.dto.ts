import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  fullName: string;
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  username: string;
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  phoneNumber: string;
  roleId: number;

  address: string;

  photo: string;

  verifyID: number;
}
