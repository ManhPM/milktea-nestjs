import { IsNotEmpty } from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty({ message: 'Lời nhắn không được bỏ trống' })
  message: string;
  userId: number;
}
