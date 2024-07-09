/**
 * Envio.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'envios',

  attributes: {
    
    destinatario: {
      type: 'string',
      maxLength: 100,
      required: true
    },
    idMunicipio: {
      type: 'number',
      required: true
    },
    idEstadoEnvio: {
      type: 'number',
      required: true
    },

    // Relación con Paqueterias (Many-to-One con paqueterias)
    idPaqueteria: {
      model: 'paqueterias'
    }

  },

};

