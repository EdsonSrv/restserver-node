const { Router } = require('express')
const { check } = require('express-validator')
const { crearProducto, 
        obtenerProductos, 
        obtenerProducto,
        actualizarProducto,
        borrarProducto} = require('../controllers/productos')
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators')

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')

const router = Router()

/**
 * {{url}}/api/productos
 */

// Obtener todas las productos - publico
router.get('/', obtenerProductos )

// Obtener una categoria por id - publico
router.get('/:id', [
  check('id', 'No es un id de mongo válido').isMongoId(),
  check('id').custom( existeProductoPorId ),
  validarCampos
], obtenerProducto)

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('categoria', 'No es un id de mongo válido').isMongoId(),
  check('categoria').custom( existeCategoriaPorId ),
  validarCampos
], crearProducto )

// Actualizar - privado - cualquiera con token válido
router.put('/:id', [
  validarJWT,
  check('id').custom( existeProductoPorId ),
  validarCampos
] ,actualizarProducto)

// Borrar una categoria - Admin
router.delete('/:id', [
  validarJWT,
  esAdminRole,
  check('id', 'No es un id de mongo válido').isMongoId(),
  check('id').custom( existeProductoPorId ),
  validarCampos
], borrarProducto)



module.exports = router