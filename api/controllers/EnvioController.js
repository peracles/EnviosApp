/**
 * HomeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Envio = require("../models/Envio");

//module.exports = {
    //friendlyName: 'Bienvenido a EnviosApp',
    //description: 'Controlador de vista principal',
    //inputs: {},
    //exits: {
    //  success: {
    //    responseType: 'view',
    //    viewTemplatePath: 'pages/Index'
    //  },
    //  notFound: {
    //   description: 'Error al cargar',
    //    responseType: 'notFound'
    //  }
    //},
    //fn: async function (inputs, exits) {
    //  return exits.success();
    //}

    
 // Index: async function (req, res) 
  //{ 
  //  return res.view('pages/Index', {layout: 'layouts/layout'})
  //},

//};

module.exports = {

  create: async function (req, res) {
    const newEnvio = await Envio.create({
      idPaqueteria: req.param('idPaqueteria'),
      destinatario: req.param('destinatario'),
      idMunicipio: req.param('idMunicipio'),
      idEstadoEnvio: req.param('idEstadoEnvio'),
      activo: req.param('activo') || true // Set default value if not provided
    });

    if (newEnvio) {
      res.status(201).json({ message: 'Envío created successfully', envio: newEnvio });
    } else {
      res.status(400).json({ message: 'Error creating envío' });
    }
  },

  // Read All Envios
  list: async function (req, res) {
    console.log(Envio);
    var envios = await Envio.find({}, (error, data) => {
      if (error) {
        
        console.log(error);
      }else{
        
        console.log(data);
      }
    });
    console.log(envios);
    res.json({ envios });
  },

  // Read Single Envío
  read: async function (req, res) {
    const envioId = req.param('id');
    const envio = await Envio.findOne(envioId);

    if (envio) {
      res.json({ envio });
    } else {
      res.status(404).json({ message: 'Envío not found' });
    }
  },

  // Update Envío
  update: async function (req, res) {
    const envioId = req.param('id');
    const updatedEnvio = await Envio.updateOne({
      id: envioId
    }, {
      idPaqueteria: req.param('idPaqueteria'),
      destinatario: req.param('destinatario'),
      idMunicipio: req.param('idMunicipio'),
      idEstadoEnvio: req.param('idEstadoEnvio'),
      activo: req.param('activo')
    });

    if (updatedEnvio) {
      res.status(200).json({ message: 'Envío updated successfully' });
    } else {
      res.status(400).json({ message: 'Error updating envío' });
    }
  },

  // Delete Envío
  delete: async function (req, res) {
    const envioId = req.param('id');
    const deletedEnvio = await Envio.destroyOne({ id: envioId });

    if (deletedEnvio) {
      res.status(200).json({ message: 'Envío deleted successfully' });
    } else {
      res.status(404).json({ message: 'Envío not found' });
    }
  }

};