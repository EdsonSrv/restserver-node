const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

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

  const { nombre, correo, password, rol} = req.body
  const usuario = new Usuario({nombre, correo, password, rol})

  //Validar correo
  const existeEmail = await Usuario.findOne({correo})
  if(existeEmail) return res.status(400).json({
    msg: 'Ese correo ya está registrado'
  })

  //Encriptar contraseña
  const salt = bcryptjs.genSaltSync()
  usuario.password = bcryptjs.hashSync(password, salt)

  //Guardar 
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