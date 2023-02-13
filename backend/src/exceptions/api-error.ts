class ApiError extends Error {
  status: number;
  errors: any;
  constructor(status: number, messsage: string, errors: any = []) {
    super(messsage);
    this.status = status;
    this.errors = errors;
  }
  static UnAuthorizedError() {
    return new ApiError(401, "Пользователь не авторизован");
  }
  static BadRequest(message: string, errors?: any) {
    return new ApiError(400, message, errors);
  }
}
export default ApiError;
