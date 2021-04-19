import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './Routers/userRouter.js';
import productRouter from './Routers/productRouter.js';
import categoryRouter from './Routers/categoryRouter.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
mongoose.connect(
  'mongodb+srv://Umim:Wtgg2JGuWoIJwzX4@cluster0.3d3jm.mongodb.net/mercadolibre-clone?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get('*', function (request, response) {
  response.sendFile(
    path.resolve(__dirname, '../react-ui/public', 'index.html')
  );
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Serve at http://localhost:' + (process.env.PORT || 5000));
});
