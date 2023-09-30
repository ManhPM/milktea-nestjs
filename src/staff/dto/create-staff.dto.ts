import { IsNotEmpty } from 'class-validator';

export class CreateStaffDto {
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  name: string;
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  phone: string;
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;
  role: number;
  gender: string;
  birthday: Date;
  hireDate: Date;
  forgot: number;
}
