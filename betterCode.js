function details(url) {
    return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
        req.open('GET', url);
        req.responseType = 'json';
        req.onload = function () {
            if (req.status == 200) {
                resolve(req.response);
            } else {
                reject(Error('Could not load successfully; error code:' + req.statusText));
            }
        };

        req.onerror = function () {
            reject(Error('There was a network error.'));
        };
        req.send();
    });

}



var detailsProducts = details('https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json');

var detailsPedidos = details('https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json');


detailsProducts.then(result => {
    detailsPedidos.then(resp => {

        let hashMap = new Map();
        for (let j = 0; j < resp.length; j++) {
            const element = resp[j];
            let idp = element.idproducto;
            let cant = parseInt(element.cantidad);

            if (hashMap.get(idp) == null) {
                hashMap.set(idp, cant);
            } else {
                let cantA = hashMap.get(idp);
                cantA += cant;
                hashMap.set(idp, cantA);
            }

        }
        let max = 0;
        let nombre;
        for (let i = 0; i < result.length; i++) {
            const element = result[i];
            let id = element.idproducto;
            let value = hashMap.get(id);
            if (value > max) {
                max = value;
                nombre = element.nombreProducto;
            }

        }
        console.log("EL producto más vendido es: -" + nombre + "- con una cantidad de: " + max + " productos vendidos")

    }).catch(error => console.log(error));
}).catch(error => console.log(error)); 
