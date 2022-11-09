class CustomError extends Error {
  constructor(code, message) {
    super(message)
    this.code = code;
  }
}

export default CustomError;
