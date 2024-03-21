export const timeLog = (req, res, next) => {
    console.log(`--${Date.now().toString()} Route:${req.url}--`);
    console.log(req.body);
    next()
}