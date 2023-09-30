export class CreateReviewDto {
  comment: string;
  rating: number;
  date: Date;
  image: string;
  userId: number;
  recipeId: number;
}
