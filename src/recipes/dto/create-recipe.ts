export class CreateRecipeDto {
  title: string;
  category: number;
  picUrl: string;
  detail: string;
  timer: {
    text: string;
    sec: number;
  }[];
}