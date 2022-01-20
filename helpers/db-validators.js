const Role = require('../models/role')
const {Usuario, Categoria} = require('../models')

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if( !existeRol ) throw new Error(`El rol ${ rol } no está registrado en la BD`)
}

const emailExiste = async(correo = '') => {
    //Validar correo
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail) throw new Error('Ese correo ya está registrado')
}

const existeUsuarioPorId = async( id ) => {
    const existeUsr = await Usuario.findById(id)
    if( !existeUsr ) throw new Error('El id no existe')
}

const existeCategoriaPorId = async ( id ) => {
    const existeCategoria = await Categoria.findById(id)
    if ( !existeCategoria ) throw new Error('El id no existe')
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId
}