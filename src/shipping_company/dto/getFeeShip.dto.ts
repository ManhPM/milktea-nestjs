import { IsNumber } from 'class-validator';

export class GetFeeShip {
  @IsNumber({}, { message: 'Kinh độ phải là số' })
  userLat: number;
  @IsNumber({}, { message: 'Vĩ độ phải là số' })
  userLng: number;
}
