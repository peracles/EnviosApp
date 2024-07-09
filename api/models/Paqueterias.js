/**
 * Paqueterias.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'paqueterias',

  attributes: {
    paqueteria: {
      type: 'string',
      maxLength: 100,
      required: true
    },

    envios: {
      collection: 'envios',
      via: 'idPaqueteria'
    }
  },

};

