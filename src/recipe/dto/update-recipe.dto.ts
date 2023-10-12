import { IsPositive } from 'class-validator';

export class UpdateRecipeDto {
  name: string;
  info: string;
  image: string;
  isActive: number;
  price: number;
  discount: number;
  typeId: number;
}
