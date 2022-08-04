class RegistroCache {
    constructor(ciudad, unDia, cincoDias, fechas, cadenaConsulta) {
        this.Ciudad = ciudad,
        this.UnDia = unDia,
        this.CincoDias = cincoDias,
        this.Fechas = fechas,
        this.CadenaConsulta = cadenaConsulta
    }
}


function aplicarLimpiezaCache() {
    localStorage.clear();
    $limpiezaEnCurso = false;
    $listaCache = [];
}


function limpiarCache() {
    setTimeout(aplicarLimpiezaCache, 120000);
}


function armarDivPorDia(response) {
    let divStringDatosTiempo = '<div class="datosTiempo">' +
        '<h4 class="datosTiempo__titleCiudad mt-5">' + response.request.query + '</h4>' +

        '<div class="row datosTiempo__row">' +
        '<div class="col-12 col-lg-6 mt-4">' +
        '<h5 class="datosTiempo__item">Temperatura: ' + response.current.temperature + '°C</h5>' +
        '</div>' +

        '<div class="col-12 col-lg-6 mt-4">' +
        '<h5 class="datosTiempo__item end">Humedad: ' + response.current.humidity + '%</h5>' +
        '</div>' +

        '<div class="col-12 col-lg-6 mt-4">' +
        '<h5 class="datosTiempo__item">Precipitaciones: ' + response.current.precip + '%</h5>' +
        '</div>' +

        '<div class="col-12 col-lg-6 mt-4">' +
        '<h5 class="datosTiempo__item end">Visibilidad: ' + response.current.visibility + '%</h5>' +
        '</div>' +

        '</div>' +

        '<img class="datosTiempo__image mt-4 mb-4" src="' + response.current.weather_icons[0] + '" alt="Imagen de tiempo">'
    '</div>';

    return divStringDatosTiempo;
}


//Hardcodeado para evitar suscripción paga
function armarDivPorCincoDias(response) {
    let divStringDatosTiempo = "";

    for (let i = 0; i < 5; i++) {
        divStringDatosTiempo += '<div class="datosTiempo">' +
            '<h4 class="datosTiempo__titleCiudad mt-5">' + response.request.query + '</h4>' +

            '<div class="row datosTiempo__row">' +
            '<div class="col-12 col-lg-6 mt-4">' +
            '<h5 class="datosTiempo__item">Temperatura: ' + response.current.temperature + '°C</h5>' +
            '</div>' +

            '<div class="col-12 col-lg-6 mt-4">' +
            '<h5 class="datosTiempo__item end">Humedad: ' + response.current.humidity + '%</h5>' +
            '</div>' +

            '<div class="col-12 col-lg-6 mt-4">' +
            '<h5 class="datosTiempo__item">Precipitaciones: ' + response.current.precip + '%</h5>' +
            '</div>' +

            '<div class="col-12 col-lg-6 mt-4">' +
            '<h5 class="datosTiempo__item end">Visibilidad: ' + response.current.visibility + '%</h5>' +
            '</div>' +

            '</div>' +

            '<img class="datosTiempo__image mt-4 mb-4" src="' + response.current.weather_icons[0] + '" alt="Imagen de tiempo">'
        '</div>';
    }

    return divStringDatosTiempo;
}


//Hardcodeado para evitar suscripción paga
function armarDivPorFechas(response) {
    let divStringDatosTiempo = '<div class="datosTiempo">' +
        '<h4 class="datosTiempo__titleCiudad mt-5">' + response.request.query + '</h4>' +

        '<div class="row datosTiempo__row">' +
        '<div class="col-12 col-lg-6 mt-4">' +
        '<h5 class="datosTiempo__item">Temperatura: ' + response.current.temperature + '°C</h5>' +
        '</div>' +

        '<div class="col-12 col-lg-6 mt-4">' +
        '<h5 class="datosTiempo__item end">Humedad: ' + response.current.humidity + '%</h5>' +
        '</div>' +

        '<div class="col-12 col-lg-6 mt-4">' +
        '<h5 class="datosTiempo__item">Precipitaciones: ' + response.current.precip + '%</h5>' +
        '</div>' +

        '<div class="col-12 col-lg-6 mt-4">' +
        '<h5 class="datosTiempo__item end">Visibilidad: ' + response.current.visibility + '%</h5>' +
        '</div>' +

        '</div>' +

        '<img class="datosTiempo__image mt-4 mb-4" src="' + response.current.weather_icons[0] + '" alt="Imagen de tiempo">'
    '</div>';

    return divStringDatosTiempo;
}


function enviarConsulta() {
    //Obtención de código postal de ciudad
    let ciudad = document.getElementById("ciudad").value;
    let url = "";
    let divStringDatosTiempo = "";
    let registroExistente;
    let unDia = $('#unDia').is(':checked');
    let cincoDias = $('#cincoDias').is(':checked');
    let fechas = $('#fechas').is(':checked');

    if(fechas && ($("#fechaDesde").val() == "" || $("#fechaHasta").val() == "")){
        alert("Debe seleccionar ambas fechas del formulario.");
    }
    else{
        //Comienza el conteo para la limpieza de caché si es que no está activa
        if (!$limpiezaEnCurso) {
            $limpiezaEnCurso = true;
            limpiarCache();
        }
    
        if (unDia) {
            registroExistente = $listaCache.find((elemento) => elemento.UnDia == true && elemento.Ciudad == ciudad);
            url = "http://api.weatherstack.com/current?access_key=cb0f7128fd3ec1fabcbf90dc3dab63a9&query=" + ciudad;
        }
        else if (cincoDias) {
            registroExistente = $listaCache.find((elemento) => elemento.CincoDias == true && elemento.Ciudad == ciudad);
    
            //Url por 5 días hardcodeado para evitar suscripción paga
            url = "http://api.weatherstack.com/current?access_key=cb0f7128fd3ec1fabcbf90dc3dab63a9&query=" + ciudad;
        }
        else {
            registroExistente = $listaCache.find((elemento) => elemento.Fechas == true && elemento.Ciudad == ciudad);
    
            //Url por fechas hardcodeado para evitar suscripción paga
            url = "http://api.weatherstack.com/current?access_key=cb0f7128fd3ec1fabcbf90dc3dab63a9&query=" + ciudad;
        }
    
        if (registroExistente != undefined) {
            divStringDatosTiempo = registroExistente.CadenaConsulta;
        }
        else {
            $.ajax({
                url: url,
                type: 'GET',
                cache: true,
                dataType: "jsonp",
                async: true,
                crossDomain: true,
                headers: {
                    'accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                success: function (response) {
                    if (unDia) {
                        divStringDatosTiempo = armarDivPorDia(response);
                        $listaCache.push(new RegistroCache(ciudad, true, false, false, divStringDatosTiempo));
                    }
                    else if (cincoDias) {
                        divStringDatosTiempo = armarDivPorCincoDias(response);
                        $listaCache.push(new RegistroCache(ciudad, false, true, false, divStringDatosTiempo));
                    }
                    else {
                        divStringDatosTiempo = armarDivPorFechas(response);
                        $listaCache.push(new RegistroCache(ciudad, false, false, true, divStringDatosTiempo));
                    }
    
                    localStorage.setItem('listaRegistrosCacheActual', $listaCache);
                    document.getElementById("datosTiempoContenedor").innerHTML = divStringDatosTiempo;
                    $("#datosTiempoContenedor").show("slow");
                },
                error: function (response) {
                    alert(JSON.stringify(response));
                }
            });
        }
    
        document.getElementById("datosTiempoContenedor").innerHTML = divStringDatosTiempo;
        $("#datosTiempoContenedor").show("slow");
    }
}
