const { response, request } = require('express')

const login = (req, res = response) => {
    res.json({
        msg: 'Login Ok'
    })
}

module.exports = {
    login
}