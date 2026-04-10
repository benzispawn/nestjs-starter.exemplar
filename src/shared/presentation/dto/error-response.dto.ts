export class ErrorResponseDto {
  message!: string | string[];
  code!: string;
  statusCode!: number;
  timestamp!: string;
  path!: string;
}
