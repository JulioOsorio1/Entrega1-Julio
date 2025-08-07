
import express from 'express';
import comprasController from '../controllers/comprasController.js';
import authorize from '../middlewares/authorize.js';
import Roles from '../roles.js';

const router = express.Router();

router.post('/comprar', authorize([
    Roles.CLIENTE,
    Roles.ENCARGADO,
    Roles.JEFE,
]), comprasController.comprar);

router.post('/aprobar/:ordenId', authorize([
    Roles.JEFE,
]), comprasController.aprobar);

export default router;
