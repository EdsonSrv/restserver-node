const { response, request } = require('express')

const usuariosGET = (req = request, res = response) => {
  const { q, nombre = 'No name', ipkey, page = 1, limit} = req.query
  res.json({
    msg: 'get API - controlador',
    q,
    nombre,
    ipkey,
    page,
    limit
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
  const { id } = req.params
  res.json({
    msg: 'put API - controlador',
    id
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