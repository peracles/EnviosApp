jp.envios = (function (jp) {
    var envios = jp.envios || {};
    var url = '';

    var envio = {};
    var nuevo = false;
    var idRegistro = -1;
    var forzar = false;

    envios.init = function(urlbase){
        url = urlbase;
        $('#forma-descripcion').html('');
        //jp.global.spinner();
        //jp.global.stopspinner();
        envios.obtenerEnvios();
    };

    envios.obtenerEnvios = function(){
        var errors = false;

        $('#lista-envios').html('');
        envio = {};
        idRegistro = -1;

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
        var grid = '<table class="table" id="envios">';
        grid += '<thead>';
        grid += '<tr>';
        grid += '<th scope="col">ID</th>';
        grid += '<th scope="col">Código Envío</th>';
        grid += '<th scope="col">Descripción</th>';
        grid += '<th scope="col">Destinatario</th>';
        grid += '<th scope="col">Dirección</th>';
        grid += '<th scope="col">Código Postal</th>';
        grid += '<th scope="col">Municipio</th>';
        grid += '<th scope="col">Estado</th>';
        grid += '<th scope="col">País</th>';
        grid += '<th scope="col">Paquetería</th>';
        grid += '<th scope="col">Estado Envío</th>';
        grid += '<th scope="col">Fecha Alta</th>';
        grid += '<th scope="col">Fecha Modificación</th>';
        grid += '<th scope="col">Acciones</th>';
        grid += '</tr>';
        grid += '</thead>';
        grid += '<tbody>';

        // Crear filas para cada registro
        response.forEach(function(envio) {
            grid += '<tr>';
            grid += '<td>' + envio.id + '</td>';
            grid += '<td>' + envio.codigoEnvio + '</td>';
            grid += '<td>' + envio.descripcion + '</td>';
            grid += '<td>' + envio.destinatario + '</td>';
            grid += '<td>' + envio.direccion + '</td>';
            grid += '<td>' + envio.codigoPostal + '</td>';
            grid += '<td>' + envio.municipio + '</td>';
            grid += '<td>' + envio.estado + '</td>';
            grid += '<td>' + envio.pais + '</td>';
            grid += '<td>' + (envio.idPaqueteria ? envio.idPaqueteria.nombre : '') + '</td>';
            grid += '<td>' + (envio.idEstadoEnvio ? envio.idEstadoEnvio.estado : '') + '</td>';
            grid += '<td>' + new Date(envio.fechaAlta).toLocaleString() + '</td>';
            grid += '<td>' + new Date(envio.fechaModificacion).toLocaleString() + '</td>';
            grid += '<td class="columna-boton"><button type="button" class="btn btn-primary btn-editar" data-id="' + envio.id + '" data-codigoenvio="' + envio.codigoEnvio + '" data-descripcion="' + envio.descripcion + '" data-destinatario="' + envio.destinatario + '" data-direccion="' + envio.direccion + '" data-codigopostal="' + envio.codigoPostal + '" data-municipio="' + envio.municipio + '" data-estado="' + envio.estado + '" data-pais="' + envio.pais + '" data-idPaqueteria="' + (envio.idPaqueteria ? envio.idPaqueteria.id : '') + '" data-nomPaqueteria="' + (envio.idPaqueteria ? envio.idPaqueteria.nombre : '') + '" data-idEstadoEnvio="' + (envio.idEstadoEnvio ? envio.idEstadoEnvio.id : '') + '" data-nomEstadoEnvio="' + (envio.idEstadoEnvio ? envio.idEstadoEnvio.estado : '') + '" data-fechaAlta="' + envio.fechaAlta + '" data-fechaModificacion="' + envio.fechaModificacion + '">Editar</button></td>';
            grid += '</tr>';
        });

        grid += '</tbody>';
        grid += '</table>';
    
        // Agregar el HTML generado a #lista-envios
        $('#lista-envios').html(grid);
    
        $(".panel").addClass("oculto");
        $("#lista-envios").removeClass("oculto");
    };
    
    envios.buscar = function(){
        var errors = false;
        nuevo = false;
        idRegistro =  $('#buscar').val();

        jp.global.get(url + "/buscar/" + idRegistro, null)
            .then(function (response){
                envios.registroEncontrado(response);
            })
            .catch(function (request, status, errorThrown){
                errors = false;
            })
            .always(function(){
                if(!errors){
                    console.log("Busqueda exitosa");
                }
            });
    }

    envios.registroEncontrado = function(response){
        $('#forma-descripcion').html('Registro Encontrado');
        console.log(response);

        $("#codigoenvio").val(response.codigoEnvio);
        $("#descripcion").val(response.descripcion);
        $("#destinatario").val(response.destinatario);
        $("#direccion").val(response.direccion);
        $("#codigopostal").val(response.codigoPostal);
        $("#municipio").val(response.municipio);
        $("#estado").val(response.estado);
        $("#pais").val(response.pais);
        $("#paqueteria").val(response.idPaqueteria.id);
        $('#estadoenvio').val(response.idEstadoEnvio.id);

        $('.readonly').attr('readonly', true);
        $(".btn-guardar").prop("disabled", true);
        $('#estadoenvio').prop('disabled', true);
        $('#paqueteria').prop('disabled', true);
        $('.btn-forzar').prop('disabled', true);
    
        $('.panel').addClass('oculto');
        $('#forma-envio').removeClass('oculto');
    };

    envios.nuevo = function(){
        $('#forma-descripcion').html('Nuevo Envio');

        $('.btn-forzar').prop('disabled', true);
        forzar = false;
        nuevo = true;
        envio = {
            id: -1
        };
        console.log(envio.id);

        $("#codigoenvio").val("");
        $("#descripcion").val("");
        $("#destinatario").val("");
        $("#direccion").val("");
        $("#codigopostal").val("");
        $("#municipio").val("");
        $("#estado").val("");
        $("#pais").val("");
        $("#paqueteria").val('1');
        $('#estadoenvio').val('1');

        $('.readonly').attr('readonly', false);
        $('#paqueteria').prop('disabled', false);

        $('.panel').addClass('oculto');
        $('#forma-envio').removeClass('oculto');
    };

    envios.cancelar = function(){
        $('.panel').addClass('oculto');
        $('#lista-envios').removeClass('oculto');
        $(".btn-guardar").prop("disabled", false);
        $('.btn-forzar').prop('disabled', false);
        forzar = false;
    };

    envios.editar = function(link){
        
        console.log(link);

        $('#forma-descripcion').html('Editar Envio');
        nuevo = false;

        // Actualizar envio con los datos del botón Editar
        envio = {
            id: $(link).data('id'),
            codigoenvio: $(link).data('codigoenvio'),
            descripcion: $(link).data('descripcion'),
            destinatario: $(link).data('destinatario'),
            direccion: $(link).data('direccion'),
            codigopostal: $(link).data('codigopostal'),
            municipio: $(link).data('municipio'),
            estado: $(link).data('estado'),
            pais: $(link).data('pais'),
            idPaqueteria: $(link).data('idpaqueteria'),
            nombrePaqueteria: $(link).data('nompaqueteria'),
            idEstadoEnvio: $(link).data('idestadoenvio'),
            nombreEstadoEnvio: $(link).data('nomestadoenvio'),
            fechaAlta: $(link).data('fechaalta'),
            fechaModificacion: $(link).data('fechamodificacion')
        };

        // Asignar los valores a los campos del formulario de edición
        $("#codigoenvio").val(envio.codigoenvio);
        $("#descripcion").val(envio.descripcion);
        $("#destinatario").val(envio.destinatario);
        $("#direccion").val(envio.direccion);
        $("#codigopostal").val(envio.codigopostal);
        $("#municipio").val(envio.municipio);
        $("#estado").val(envio.estado);
        $("#pais").val(envio.pais);
        $("#paqueteria").val(envio.idPaqueteria);
        $('#estadoenvio').val(envio.idEstadoEnvio);

        $('.readonly').attr('readonly', true);
        $('#paqueteria').prop('disabled', true);

        console.log(envio);
        $('.panel').addClass('oculto');
        $('#forma-envio').removeClass('oculto');
    };

    envios.forzar = function(){
        forzar = true;
        envios.guardar();
    }

    envios.guardar = function () {
        var errors = false;
        var params = {};

        if(envio.id != -1){
            if (forzar) {

            params.id = envio.id;
            params.idEstadoEnvio = $('#estadoenvio').val();
            console.log(params);

            jp.global.post(url + "/actualizar", params)
                .then(function (response) {
                    console.log('Edicion exitosa!');
                    return jp.global.get(url + "/lista", null);
                })
                .then(function (response) {
                    $(".panel").addClass("oculto");
                    $('#lista-envios').html('');
                    envios.llenaEnvios(response);
                })
                .catch(function (request, status, errorThrown) {
                    errors = true;
                })
                .always(function () {
                    if (!errors) {
                        $('.btn-forzar').prop('disabled', false);
                    }
                });
                
            } else {

                 // Obtener los valores de los campos editados
                envio.idEstadoEnvio = $('#estadoenvio').val();
                envio.nombreEstadoEnvio = $('#estadoenvio option:selected').text();

                // Actualizar visualmente el estado en la lista
                var row = $('#lista-envios').find('button[data-id="' + envio.id + '"]').closest('tr');
                row.find('td:eq(10)').text($('#estadoenvio option:selected').text());

                // Actualizar el data attribute del botón de editar
                var createButton = row.find('.columna-boton');

                // Actualizar el botón de edición con los nuevos valores
                createButton.html('<button type="button" class="btn btn-primary btn-editar" data-id="' + envio.id + '" data-codigoenvio="' + envio.codigoenvio + '" data-descripcion="' + envio.descripcion + '" data-destinatario="' + envio.destinatario + '" data-direccion="' + envio.direccion + '" data-codigopostal="' + envio.codigopostal + '" data-municipio="' + envio.municipio + '" data-estado="' + envio.estado + '" data-pais="' + envio.pais + '" data-idPaqueteria="' + envio.idPaqueteria + '" data-nomPaqueteria="' + envio.nombrePaqueteria + '" data-idEstadoEnvio="' + envio.idEstadoEnvio + '" data-nomEstadoEnvio="' + envio.nombreEstadoEnvio + '" data-fechaAlta="' + envio.fechaAlta + '" data-fechaModificacion="' + envio.fechaModificacion + '">Editar</button>');

                // Actualizar envio con los nuevos datos después de la edición
                envio = {};

                

                // Limpiar el formulario y volver a la lista
                $('.btn-forzar').prop('disabled', false);
                $('.panel').addClass('oculto');
                $('#lista-envios').removeClass('oculto');
                
            }

            

        
            

        }else{
            params.codigoenvio =$("#codigoenvio").val();
            params.descripcion = $("#descripcion").val();
            params.destinatario = $("#destinatario").val();
            params.direccion = $("#direccion").val();
            params.codigopostal = $("#codigopostal").val();
            params.municipio = $("#municipio").val();
            params.estado = $("#estado").val();
            params.pais = $("#pais").val();
            params.idPaqueteria = $('#paqueteria').val();
            params.idEstadoEnvio = $('#estadoenvio').val();
            console.log(params);
            
            alert();

            jp.global.post(url + "/envios", params)
                .then(function (response) {
                    console.log('Creacion exitosa!');
                    return jp.global.get(url + "/lista", null);
                })
                .then(function (response) {
                    $(".panel").addClass("oculto");
                    $('#lista-envios').html('');
                    envios.llenaEnvios(response);
                })
                .catch(function (request, status, errorThrown) {
                    errors = true;
                })
                .always(function () {
                    if (!errors) {
                        $('.btn-forzar').prop('disabled', false);
                    }
                });

        }
    };

    return envios;
})(jp);