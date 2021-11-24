const Role = require('../models/role')
const Usuario = require('../models/usuario')

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if( !existeRol ) throw new Error(`El rol ${ rol } no está registrado en la BD`)
}

const emailExiste = async(correo = '') => {
    //Validar correo
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail) throw new Error('Ese correo ya está registrado')
}

module.exports = {
    esRoleValido,
    emailExiste
}