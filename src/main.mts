import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import errorHandler from './middlewares/errorMiddleware.mjs';

import routes from './routes/index.mjs';

const app = express();
const port = process.env.PORT || 3000;
console.log(process.env.PORT)
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

app.listen(port, () => {
  console.log(`server is up and running on port ${port}`);
});

app.get('/', (req, res) => {
  res.json('hello world');
});

app.use('/api', routes);

// userRoutes(app);
// productRoutes(app);
// orderRoutes(app);

app.use(errorHandler);

export default app;
