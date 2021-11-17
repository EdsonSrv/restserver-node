const { response, request } = require('express')
const Usuario = require('../models/usuario')

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

const usuariosPost = async (req, res = response) => {
  const body = req.body
  const usuario = new Usuario(body)
  await usuario.save()
  res.status(201).json({
    usuario
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