export class CreateRecipeDto {
  productName: string;
  title: string;
  category: number;
  subCategory: string;
  picUrl: string;
  detail: string;
  totalCount: number;
  timer: {
    text: string;
    sec: number;
  }[];
}
