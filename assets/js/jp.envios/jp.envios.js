jp.envios = (function (jp) {
    var envios = jp.envios || {};
    var url = '';

    envios.init = function(urlbase){
        url = urlbase;
        //jp.global.spinner();
        //jp.global.stopspinner();
        envios.obtenerEnvios();
    };

    envios.obtenerEnvios = function(){
        var errors = false;

        $('#lista-envios').html('');

        jp.global.get(url + "/lista", null)
            .then(function (response){
                envios.llenaEnvios(response);
            })
            .catch(function (request, status, errorThrown){
                errors = false;
            })
            .always(function(){
                if(!errors){
                    console.log("Busqueda exitosa");
                }
            });
    };

    envios.llenaEnvios = function(response){
        console.log(response);
        
        // Crear el encabezado de la tabla
        var grid = '<table class="table">';
        grid += '<thead>';
        grid += '<tr>';
        grid += '<th scope="col">Destinatario</th>';
        grid += '<th scope="col">Paqueteria</th>';
        grid += '<th scope="col">ID Municipio</th>';
        grid += '<th scope="col">ID Estado Envío</th>';
        grid += '<th scope="col">Fecha Alta</th>';
        grid += '<th scope="col">Fecha Modificación</th>';
        grid += '<th scope="col">Acciones</th>';
        grid += '</tr>';
        grid += '</thead>';
        grid += '<tbody>';


        // Crear filas para cada registro
        response.forEach(function(envio) {
            grid += '<tr>';
            grid += '<td>' + envio.destinatario + '</td>';
            grid += '<td>' + envio.idPaqueteria.paqueteria + '</td>';
            grid += '<td>' + envio.idMunicipio + '</td>';
            grid += '<td>' + envio.idEstadoEnvio + '</td>';
            grid += '<td>' + new Date(envio.FechaAlta).toLocaleString() + '</td>';
            grid += '<td>' + new Date(envio.FechaModificacion).toLocaleString() + '</td>';        
            grid += '<td><button type="button" class="btn btn-primary btn-editar" data-id="' + envio.id + '" data-destinatario="' + envio.destinatario + '" data-paqueteria="' + envio.idPaqueteria.paqueteria + '" data-idMunicipio="' + envio.idMunicipio + '" data-idEstadoEnvio="' + envio.idEstadoEnvio + '" data-fechaAlta="' + envio.FechaAlta + '" data-fechaModificacion="' + envio.FechaModificacion + '">Editar</button></td>';
            grid += '</tr>';
        });

        grid += '</tbody>';
        grid += '</table>';

        // Agregar el HTML generado a #lista-envios
        $('#lista-envios').html(grid);

        $(".panel").addClass("oculto");
        $("#lista-envios").removeClass("oculto");
    };

    envios.nuevo = function(){
        $('.panel').addClass('oculto');
        $('#forma-envio').removeClass('oculto');
    };

    envios.cancelar = function(){
        $('.panel').addClass('oculto');
        $('#lista-envios').removeClass('oculto');
    };

    envios.editar = function(link){
        var envio = {
            id: $(link).data('id'),
            destinatario: $(link).data('destinatario'),
            paqueteria: $(link).data('paqueteria'),
            idMunicipio: $(link).data('idmunicipio'),
            idEstadoEnvio: $(link).data('idestadoenvio'),
            fechaAlta: $(link).data('fechaalta'),
            fechaModificacion: $(link).data('fechamodificacion')
        };
    
        console.log(envio);
        $('.panel').addClass('oculto');
        $('#forma-envio').removeClass('oculto');
    };
    //$(.panel).addClass('oculto');
    //$(#elemnto).removeClass('oculto');

    return envios;
})(jp);