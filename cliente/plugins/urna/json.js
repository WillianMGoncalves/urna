var JsonUtils = {
    ordernarESerializar: function( json ){

        var jsonSerializado = '';
        var chavesJson = [];
        var chavesEValoresJson = [];
        if( json instanceof Object ){

            jsonSerializado += '{';
            chavesJson = Object.keys( json );
            for( var indiceChaveJson = 0; indiceChaveJson < chavesJson.length; indiceChaveJson++ ){

                var chaveJson = chavesJson[indiceChaveJson];
                var valorJson = json[chaveJson];
                chavesEValoresJson[indiceChaveJson] = '"' + chaveJson + '":' + JsonUtils.ordernarESerializar(valorJson);
            }
            jsonSerializado += chavesEValoresJson.sort().join(',') + '}';
            return jsonSerializado;
        } else {

            return '"' + json + '"';
        }
    }
}
