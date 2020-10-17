import { ErrorRequestHandler } from "express";
import { array, ValidationError } from "yup";

interface ValidationErrors {
  [ket: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  console.error(error);

  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach((err) => {
      errors[err.path] = err.errors;
    });

    return response.status(400).json({
      message: "Validation fail.",
      errors,
    });
  }

  return response.status(500).json({
    message: "Internal Server Error",
  });
};

export default errorHandler;
