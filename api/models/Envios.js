/**
 * Envio.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'envios',

  attributes: {
    
    codigoEnvio: {
      type: 'number',
      required: true
    },
    descripcion: {
      type: 'string',
      maxLength: 255,
      required: true
    },
    destinatario: {
      type: 'string',
      maxLength: 45,
      required: true
    },
    direccion: {
      type: 'string',
      maxLength: 255,
      required: true
    },
    codigoPostal: {
      type: 'string',
      maxLength: 10,
      required: true
    },
    municipio: {
      type: 'string',
      maxLength: 45,
      required: true
    },
    estado: {
      type: 'string',
      maxLength: 45,
      required: true
    },
    pais: {
      type: 'string',
      maxLength: 45,
      required: true
    },

    // Relación con Paqueterias (Many-to-One con paqueterias)
    idPaqueteria: {
      model: 'paqueterias'
    },

    idEstadoEnvio: {
      model: 'estadosenvio'
    }

  },

};

