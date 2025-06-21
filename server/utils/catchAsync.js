const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);     // ➡️ equivalent to next(error), will be passed to error middleware
    }
}
// Stop creating multiple try / catch handler
export default catchAsync;



/*      Error Flow Overview:
                Controller (async)
                 ⮕ catchAsync(fn)
                     ⮕ catches any thrown error
                         ⮕ passes to next(err)
                             ⮕ triggers errorMiddleware

 */