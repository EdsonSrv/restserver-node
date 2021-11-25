const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const usuariosGET = async(req = request, res = response) => {
  const { limit = 5, desde = 0 } = req.query
  const query = { estado: true }
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number( desde ))
    .limit(Number( limit ))
  ])

  res.json({
    total,
    usuarios
  })
}

const usuariosPost = async (req, res = response) => {

  const { nombre, correo, password, rol} = req.body
  const usuario = new Usuario({nombre, correo, password, rol})

  //Encriptar contraseña
  const salt = bcryptjs.genSaltSync()
  usuario.password = bcryptjs.hashSync(password, salt)

  //Guardar 
  await usuario.save()
  res.status(201).json({
    usuario
  })
}

const usuariosPut = async (req, res = response) => {
  const { id } = req.params
  const { _id, password, google, correo, ...resto} = req.body

  if( password ){
    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync()
    resto.password = bcryptjs.hashSync(password, salt)
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto)
  res.json(usuario)
}

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params

  //Borrado físico
  // const usuario = await Usuario.findByIdAndDelete( id )

  //Borrado lógico
  const usuario = await Usuario.findByIdAndUpdate( id, { estado: false })

  res.json(usuario)
}

module.exports = {
  usuariosGET,
  usuariosPost,
  usuariosPut,
  usuariosDelete
}