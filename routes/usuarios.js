const { Router } = require('express')
const { usuariosGET, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios')

const router = Router()

router.get('/', usuariosGET)

router.post('/', usuariosPost)

router.put('/', usuariosPut)

router.delete('/', usuariosDelete)

module.exports = router