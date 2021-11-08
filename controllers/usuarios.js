const { response } = require('express')

const usuariosGET = (req, res = response) => {
  res.json({
    msg: 'get API - controlador'
  })
}

const usuariosPost = (req, res = response) => {
  const { nombre, edad } = req.body
  res.status(201).json({
    msg: 'post API - controlador',
    nombre,
    edad
  })
}

const usuariosPut = (req, res = response) => {
  res.json({
    msg: 'put API - controlador'
  })
}

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: 'delete API - controlador'
  })
}

module.exports = {
  usuariosGET,
  usuariosPost,
  usuariosPut,
  usuariosDelete
}