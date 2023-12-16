import express, { Request, Response } from 'express'
import router from './presentation/routes/Router';

const app = express()
const PORT = process.env.PORT || 8080

// Middleware para permitir CORS
app.use((_req: Request, res: Response, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// Middleware para transformar req.body en json
app.use(express.json())

app.use("/api", router);
app.use("/", (_req: Request, res: Response) => {
    res.send(`<h1>Server home page</h1>`)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ...`)
})