const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')
const { generaJWT } = require('../helpers/generar-jwt')
const { googleVerify } = require('../helpers/google-verify')

const login = async(req, res = response) => {
  const { correo, password } = req.body

  try {

    //Verificar si el correo existe
    const usuario = await Usuario.findOne({ correo })
    if(!usuario) return res.status(400).json({
      msg: 'Usuario / Password no son correctos - correo'
    })
    
    //Validar estdo del usuario
    if(!usuario.estado) return res.status(400).json({
      msg: 'Usuario / Password no son correctos - estado: false'
    })

    //Valida contraseña
    const validaPasword = bcryptjs.compareSync(password, usuario.password)
    if(!validaPasword) return res.status(400).json({
      msg: 'Usuario / Password no son correctos - password'
    })

    //Generar JWT
    const token = await generaJWT( usuario.id )
    res.json({
      usuario,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Contacte con el administrador'
    })
  }

}

const googleSignIn = async( req, res = response) => {
  const { id_token } = req.body

  try {

    const { nombre, img, correo } = await googleVerify( id_token )

    res.json({
      msg: 'Todo bien',
      id_token
    })
    
  } catch (error) {
    json.status(400).json({
      ok:false,
      msg: 'El Token no se pudo verificar'
    })
  }

}

module.exports = {
  login,
  googleSignIn
}