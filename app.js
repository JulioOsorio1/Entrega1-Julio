
import express from 'express';
import mongoose from 'mongoose';
import passport from './src/config/passport.js'; 
import sessionRoutes from './src/routes/sessions.js';
import userRoutes from './src/routes/users.js';

const app = express();
app.use(express.json());
const PORT =8080;

mongoose.connect('mongodb://localhost:27017/ecommerce')
.then(()=>console.log('Conectado a MongoDb'))
.catch(error=> console.error('Error al conectar a Mongodb'))

app.use('/api/sessions', sessionRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT,()=>{
    console.log(`servidor corriendo en http://localhost:${PORT}`)
})
