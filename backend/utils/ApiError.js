class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        
        // Assign the custom properties
        this.statusCode = statusCode;
        this.data = null; // Can be used to store additional data related to the error
        this.success = false; // Indicates the API request was not successful
        this.errors = errors; // Stores any additional error details
        this.message = message; // Stores the error message

        // Handle the stack trace
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
