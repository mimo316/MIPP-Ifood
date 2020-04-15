const connection = require('../database/connection');

module.exports = {

  async index (req,res) {
    
    const pedidos = await connection('pedidos')
      .select('*').where('estado', '<>', '2');
    return res.json(pedidos);
  },

  async create (req,res) {
    const {id, estado} = req.body;

    await connection('pedidos').insert({
      id,
      estado,
    })
    return res.json({ id });
  },

  async update (req,res) {
    const {id, estado} = req.body;

    await connection('pedidos').where('id', id).update({estado})
    return res.json({ id });
  },
   
}


