const { response, request } = require("express")

const esAdminrole = ( req = request, res = response, next ) => {
  if( !req.usuario ) return res.status(500).json({
    msg: 'Se quiere validar el rol sin verificar el token primero'
  })
  const { rol, nombre } = req.usuario
  if( rol !== 'ADMIN_ROLE' ) return res.status(401).json({
    msg: `${nombre} no es administrador`
  })

  next()
}

module.exports = {
  esAdminrole
}