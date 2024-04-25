const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserRepository {
  async create(userData) {
    const { name, email, password } = userData;

    // Gerar o hash da senha
    const hashedPassword = await bcrypt.hash(password, 10); // 10 é o número de saltos de hash

    // Criar um novo usuário com a senha hasheada
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword // Usando a senha hasheada
    });

    // Salvar o usuário no banco de dados
    await newUser.save();
    return newUser;
  }
 
  async findAll(){
    return User.find();
  }
  async findById(id){
    return User.findById(id);
  }
  async updateById(id, userData){
    return User.findByIdAndUpdate(id, userData, {new: true});
  }
  async deleteById(id){
    return User.findByIdAndDelete(id);
  }
}

module.exports = new UserRepository();