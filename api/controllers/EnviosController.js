/**
 * EnvioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    async index(req, res) {
        try {
          // Obtener la ruta base
          let baseUrl = obtenerRutaBase(req);
    
          // Renderizar la vista y pasar la variable `baseUrl`
          return res.view('pages/envios/index', {
            layout: 'layouts/layout',
            locals: { baseUrl }  // Pass baseUrl using locals object
          });
        } catch (error) {
          return res.serverError(error);
        }
      },
  
    async create(req,res){
        try {

            let params = req.allParams();
            if (!params) {
                res.badRequest({err: 'Datos no obtenidos'});
            }

            const results = await Envios.create({
                idPaqueteria: params.idPaqueteria,
                destinatario: params.destinatario,
                idMunicipio: params.idMunicipio,
                idEstadoEnvio: params.idEstadoEnvio
            });
                
            return res.ok(results);
            
        } catch (err) {
            return res.serverError(err);
        }
    },

    async find(req,res){
        try {
            const envios = await Envios.find().populate('idPaqueteria');
            return res.ok(envios);
        } catch (error) {
            return res.serverError(error);
        }
    },

    async findOne(req,res){
        try {
            const envio = await Envios.findOne({id: req.params.id});

            return res.ok(envio);
            
        } catch (error) {
            return res.serverError(error);
        }
    },

    async update(req,res){
        try {
            let params = req.allParams();
            let attributes = {};

            if(params.idPaqueteria){
                attributes.idPaqueteria = params.idPaqueteria;
            }
            if(params.destinatario){
                attributes.destinatario = params.destinatario;
            }
            if(params.idMunicipio){
                attributes.idMunicipio = params.idMunicipio;
            }
            if(params.idEstadoEnvio){
                attributes.idEstadoEnvio = params.idEstadoEnvio;
            }

            const result = await Envios.update({id: req.params.id}, attributes);
            return res.ok(result);
            
        } catch (error) {
            return res.serverError(error);
        }
    },
//destroy(){}
};

function obtenerRutaBase(req) {
    // Obtener el protocolo (http o https)
    let protocol = req.protocol;
  
    // Obtener el dominio y puerto
    let host = req.hostname;

    let port = req.socket.localPort; // Obtener el puerto desde la solicitud
  
    // Combinar el protocolo, dominio y puerto para formar la ruta base
    let baseUrl = protocol + "://" + host + ":" + port;
  
    return baseUrl;
  }

