import express, {NextFunction, Request, Response} from 'express'
import cors from 'cors'
import {weatherRouter} from "./routes/weathers";

const app = express()
const port = 3636;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())


app.get('/health', (req, res) => {
    res.status(200).send()
})

app.use('/', weatherRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(`Click to open: http://localhost:${port}`)
})

export default app