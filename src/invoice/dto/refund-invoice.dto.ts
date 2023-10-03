import { IsNotEmpty } from 'class-validator';

export class RefundPaymentDto {
  @IsNotEmpty({ message: 'Mã hoá đơn không được để trống' })
  id_order: number;
  @IsNotEmpty({ message: 'Ngày giao dịch không được để trống' })
  transDate: Date;
  @IsNotEmpty({ message: 'Số tiền không được để trống' })
  amount: number;
  @IsNotEmpty({ message: 'Loại giao dịch không được để trống' })
  transType: number;
  @IsNotEmpty({ message: 'Người thực hiện không được để trống' })
  user: number;
}
