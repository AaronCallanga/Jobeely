export const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";

    res.status(statusCode || 500).json({
        status: err.status || "error",
        statusCode,
        message
    });
}
