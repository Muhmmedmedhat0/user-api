// CustomResponse class to include statusCode and data properties
export default class CustomResponse extends Response {
  statusCode?: number;
  data?: any;

  constructor(message: string, statusCode?: number, data?: any) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}