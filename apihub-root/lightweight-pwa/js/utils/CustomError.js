class CustomError extends Error {
  constructor(code, message, errData) {
    super(message)
    this.code = code;
    this.errData = errData
  }
}

export default CustomError;
