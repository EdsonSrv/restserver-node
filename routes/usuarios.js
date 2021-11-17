const { Router } = require('express')
const { check } = require('express-validator')

const { usuariosGET, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios')

const router = Router()

router.get('/', usuariosGET)

router.post('/', [
    check('correo', 'El correo no es válido').isEmail()
], usuariosPost)

router.put('/:id', usuariosPut)

router.delete('/', usuariosDelete)

module.exports = router