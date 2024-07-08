/**
 * HomeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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

//};

module.exports = {
  Index: function (req, res) 
  { 
    return res.view('pages/Index');
  }
  //logout: function (req, res) { ... },
  //signup: function (req, res) { ... },
};