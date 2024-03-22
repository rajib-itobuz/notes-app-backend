export const timeLog = (req, res, next) => {
    console.log(`--${Date.now().toString()} Route:${req.url} Method:${req.method}--`);
    console.log(req.body);
    next()
}