const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

const login = async (req, res) => {
    console.log(req.body)
    try {
        const usuario = await User.findOne({ email: req.body.email });

        if (!usuario) {
            return res.status(400).json({ 
                message: 'Usuário não encontrado',
                data: {
                    email: req.body.email
                } 
            });
        }

        const validPassword = await bcrypt.compare(req.body.password, usuario.password);
        if (!validPassword) {
            return res.status(401).json({ 
                statusCode: 401, 
                message: 'Usuário não autorizado',           
            });
        }

        const token = jwt.sign({ name: usuario.name }, config.secretKey);
        res.status(200).json({
            statusCode: 200, 
            message: 'Usuário autenticado',
            data: {
                token
            } 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { login };
