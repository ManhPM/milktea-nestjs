import { IsNotEmpty } from 'class-validator';

export class CreateTourDto {
  @IsNotEmpty({ message: 'Tên tour không được để trống' })
  tourName: string;

  @IsNotEmpty({ message: 'Ngày bắt đầu tour không được để trống' })
  startDate: Date;

  @IsNotEmpty({ message: 'Địa điểm tour không được để trống' })
  address: string;

  @IsNotEmpty({ message: 'Ngày kết thúc tour không được để trống' })
  endDate: Date;

  @IsNotEmpty({ message: 'Lịch trình không được để trống' })
  itineraries: string;

  @IsNotEmpty({ message: 'Giá tour không được để trống' })
  price: number;

  @IsNotEmpty({ message: 'Số vé không được để trống' })
  maxSeats: number;

  @IsNotEmpty({ message: 'Hình ảnh tour không được để trống' })
  image: string;

  @IsNotEmpty({ message: 'Loại tour không được để trống' })
  categoryId: number;

  @IsNotEmpty({ message: 'Hướng dẫn viên không được để trống' })
  guideId: number;

  duration: number;
  discount: number;
  description: string;
  featured: boolean;
  status: string;
  availableSeats: number;
}
