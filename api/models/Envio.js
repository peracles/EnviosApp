/**
 * Envio.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'envios', // Assuming your MySQL table is named 'envios'

  attributes: {
    id: {
      type: 'number',
      autoIncrement: true,
      required: true
    },
    idPaqueteria: {
      type: 'number',
      required: true
    },
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
    activo: {
      type: 'boolean',
      defaultsTo: true
    },
    fechaAlta: {
      type: 'string', 
      columnType: 'datetime',
      autoCreatedAt: true
    },
    fechaModificacion: {
      type: 'string', 
      columnType: 'datetime',
      required: false
    }
    // Add other attributes as needed
  }

};

