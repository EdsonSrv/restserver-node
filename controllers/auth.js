const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')
const { generaJWT } = require('../helpers/generar-jwt')
const { googleVerify } = require('../helpers/google-verify')
const { DefaultTransporter } = require('google-auth-library')

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
    let usuario = await Usuario.findOne({ correo })

    
    if( !usuario ) {
      //Hay que crearlo
      const data = {
        nombre,
        correo,
        rol: 'USER_ROLE',
        password: ':P',
        img,
        google: true
      }
      
      usuario = new Usuario( data )
      await usuario.save()
    }

    //Si el usuario en DB
    if( !usuario.estado ) return res.status(401).json({
      msg: 'Hable con el administrador, usuario bloqueado'
    })

    //Generar el JWT
    const token = await generaJWT( usuario.id )

    res.json({
      usuario,
      token
    })
    
  } catch (error) {
    res.status(400).json({
      msg: 'El Token de Google no se pudo verificar'
    })
  }

}

module.exports = {
  login,
  googleSignIn
}