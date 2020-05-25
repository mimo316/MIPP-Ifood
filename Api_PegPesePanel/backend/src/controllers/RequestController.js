const connection = require('../database/connection');

module.exports = {

  async index (req,res) {
    
    const pedidos = await connection('pedidos')
      .select('*').where('estado', '<>', '2');
    return res.json(pedidos);
  },

  async create (req,res) {
    // parametros vindos do front
    const {id, estado} = req.body;

    // fazemos um delete de todos os pedidos chamados
    await connection('pedidos').where('estado',2).delete()

    // criando pedido, começa com default 0
    await connection('pedidos').insert({ 
      id,
      estado,
    })
    return res.json({ id });
  },

  // troca o estado do pedido para 2,
  async update (req,res) {
    const {id, estado} = req.body;

    await connection('pedidos').where('id', id).update({estado})
    return res.json({ id });
  },
   /*
    Estados 0 1 2 
    0 ultimo pedido chamado,
    1 pedido na fila de espera,
    2 pedido já finalizado e que vai ser excluído
   */
}


