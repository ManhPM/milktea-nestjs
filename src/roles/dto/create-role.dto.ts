import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Tên quyền không được để trống' })
  roleName: string;
}
