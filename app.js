
import express from 'express';
import mongoose from 'mongoose';
import passport from './src/config/passport.js';
import sessionRoutes from './src/routes/sessions.js';
import userRoutes from './src/routes/users.js';
import auth from './src/middlewares/authorize.js';
import comprasRouter from'./src/routes/comprasRouter.js';
import userDao from './src/dao/userDao.js';
import authorizeRoles from './src/middlewares/authorizationMiddleware.js';


const app = express();
app.use(express.json());
const PORT =8080;


mongoose.connect('mongodb://localhost:27017/ecommerce')
.then(()=>console.log('Conectado a MongoDb'))
.catch(error=> console.error('Error al conectar a Mongodb'))

app.use('/api/sessions', sessionRoutes);
app.use('/api/users', userRoutes);
app.use(express,json());
app.use(auth);
app.use('/api',comprasRouter);
app.use(userDao);
router.get('/admin', authorizeRoles('admin'));

app.use(passport.initialize());

app.listen(PORT,()=>{
    console.log(`servidor corriendo en http://localhost:${PORT}`)
})
