/**
 * EnviosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    Index: function (req, res) 
    { 
      return res.view('pages/Envios', {layout: 'layouts/layout'})
    }

};

