const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

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

    res.json({
      msg: 'Login Ok'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Contacte con el administrador'
    })
  }

}

module.exports = {
  login
}