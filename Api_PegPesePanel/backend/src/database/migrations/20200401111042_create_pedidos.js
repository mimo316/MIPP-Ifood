
exports.up = function(knex) {
  return knex.schema.createTable('pedidos', function(table) {
    table.string('id').primary();
    table.string('estado').defaultTo(0);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('pedidos');
};
