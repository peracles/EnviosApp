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
  
      async create(req, res) {
        try {
            let params = req.allParams();
            if (!params) {
                return res.badRequest({ err: 'Datos no obtenidos' });
            }
    
            const newEnvio = await Envios.create({
                codigoEnvio: parseInt(params.codigoenvio),
                descripcion: params.descripcion,
                destinatario: params.destinatario,
                direccion: params.direccion,
                codigoPostal: params.codigopostal,
                municipio: params.municipio,
                estado: params.estado,
                pais: params.pais,
                idPaqueteria: parseInt(params.idPaqueteria),
                idEstadoEnvio: parseInt(params.idEstadoEnvio)
            }).fetch(); // Utiliza .fetch() para obtener el registro creado
    
            return res.ok(newEnvio);
    
        } catch (err) {
            return res.serverError(err);
        }
    },
    
      async find(req, res) {
        try {
          const envios = await Envios.find().populate('idPaqueteria').populate('idEstadoEnvio');
          return res.ok(envios);
        } catch (error) {
          return res.serverError(error);
        }
      },
    
      async findOne(req, res) {
        try {
          const envio = await Envios.findOne({ id: req.params.id }).populate('idPaqueteria').populate('idEstadoEnvio');
          if (!envio) {
            return res.notFound({ err: 'Registro no encontrado' });
          }
          return res.ok(envio);
    
        } catch (error) {
          return res.serverError(error);
        }
      },
    
      async update(req, res) {
        const { id, idPaqueteria, idEstadoEnvio } = req.body;

        // Validar que los IDs sean válidos
        if (idPaqueteria !== null && idPaqueteria <= 0) {
          return res.status(400).send('Invalid idPaqueteria');
        }
        if (idEstadoEnvio !== null && idEstadoEnvio <= 0) {
          return res.status(400).send('Invalid idEstadoEnvio');
        }
    
        try {
          // Realizar la actualización
          const updatedEnvio = await Envios.updateOne({ id }).set(req.body);
          if (!updatedEnvio) {
            return res.status(404).send('Envio not found');
          }
          return res.json(updatedEnvio);
        } catch (error) {
          return res.serverError(error);
        }
      }
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

