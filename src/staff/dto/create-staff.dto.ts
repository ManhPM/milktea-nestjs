import { IsNotEmpty } from 'class-validator';

export class CreateStaffDto {
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  name: string;
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  phone: string;
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  address: string;
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;
  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  gender: string;
  @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
  birthday: Date;
  @IsNotEmpty({ message: 'Ngày vào làm không được để trống' })
  hiredate: Date;
  role: number;
  isActive: number;
}
