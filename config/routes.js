/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  '/': { view: 'pages/Index'},

  // Create Envío
  '/create': {
    controller: 'HomeController',
    action: 'create'
  },

  // Read All Envios
  '/list': {
    controller: 'EnvioController',
    action: 'list'
  },

  // Read Single Envío
  '/:id': {
    controller: 'HomeController',
    action: 'read'
  },

  // Update Envío
  '/:id/update': {
    controller: 'HomeController',
    action: 'update'
  },

  // Delete Envío
  '/:id/delete': {
    controller: 'HomeController',
    action: 'delete'
  },

  //Esto usando mongo
  'GET /envios': { view: 'pages/Envios' }


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
