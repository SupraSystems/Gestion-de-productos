import { Router } from 'express'
const router = Router();

import upload from '../libs/multer'
import { getProductos, createProducto, deleteProducto, getProducto, updateProducto, updateDescuento, getComboDeProducto, getDescuentoProducto, getFoto, getCategoria } from '../controllers/producto.controller'
import { createDescuento, deleteDescuento, getDescuento, getDescuentos } from '../controllers/descuento.controller';
import { createCombo, deleteCombo, getCombo, updateCombo } from '../controllers/combo.controller';
import { createDetalle, deleteDetalle, getDetalle, getDetalles, updateDetalle } from '../controllers/detalle.controller';

// middleware
// router.use(upload.single('image'));

// routes
router.route('/producto')
    .get(getProductos)
    .post(upload.single('imagen'), createProducto);
router.route('/producto/:id')
    .get(getProducto)
    .delete(deleteProducto)
    .put(updateProducto)
    .put(updateDescuento);
router.route('/descuento')
    .get(getDescuentos)
    .post(createDescuento)
router.route('/descuento/:id')
    .get(getDescuento)
    .delete(deleteDescuento)
    .put(updateDescuento)
router.route('/combo')
    .get(getCombo)
    .post(upload.single('imagen'),createCombo)
router.route('/combo/:id')
    .get(getCombo)
    .delete(deleteCombo)
    .put(updateCombo)
router.route('/detalle')
    .get(getDetalles)
    .post(createDetalle)
router.route('/detalle/:id')
    .get(getDetalle)
    .delete(deleteDetalle)
    .put(updateDetalle)
router.route('/comboProducto/:id')
    .get(getComboDeProducto)
router.route('/descuentoProducto/:id')
    .get(getDescuentoProducto)

router.route('/foto/:id')
.get(getFoto)

router.route('/categoria/:tipo')
.get(getCategoria)
export default router;