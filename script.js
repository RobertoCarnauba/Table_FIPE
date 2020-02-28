let btn_p = document.querySelector("button")
let select = document.querySelector("select")
var slt = document.getElementById("selectNumber")
var slt_modelo = document.getElementById("selectModelo")
var slt_ano = document.getElementById("selectAno")
var slt_versao = document.getElementById("selectVersao")

// let cars = [
//     'volvo', 'saab', 'mercedes', 'mercedes', 'audi'
// ]

btn_p.addEventListener('click', () => {
    // let options = cars.map(car =>
    //     `<option value="${car}">${car}</option>`).join('\n')
    // select.innerHTML = options

    axios.get('http://fipeapi.appspot.com/api/1/carros/marcas.json')
        .then(function (response) {
            var cars = response.data
            for (var i = 0; i < cars.length; i++) {
                var opt = cars[i].name;
                var optv = cars[i].id
                // console.log(cars[i].name+cars[i].id)
                var el = document.createElement("option");
                var idopt = document.createElement("value");
                el.textContent = opt;
                idopt.textContent = optv;
                el.value = optv;
                slt.appendChild(el);
                slt.appendChild(idopt)
            }
            slt.addEventListener('change', () => {
                let id_marca = document.getElementById("selectNumber").value
                sessionStorage.setItem('id_marca', id_marca)
                modelo()
            })


        })
        .catch(function (error) {
            console.log(error);
        })

})

function modelo() {
    var modelo = sessionStorage.getItem('id_marca');
    axios.get('http://fipeapi.appspot.com/api/1/carros/veiculos/' + modelo + '.json')
        .then(function (response) {
            var modelos = response.data
            var json = JSON.stringify(modelos)
            for (var i = 0; i < modelos.length; i++) {
                var mpt = modelos[i].name;
                var mptv = modelos[i].id
                var elm = document.createElement("option");
                // var idopt = document.createElement("value");
                elm.textContent = mpt;
                // idopt.textContent = mptv;
                elm.value = mptv;
                slt_modelo.appendChild(elm);
                // slt.appendChild(idopt)
            }
            slt_modelo.addEventListener('change', () => {
                //let id_versoes = document.getElementById("selectModelo").value
                //sessionStorage.setItem('  ' ,id_marca)
                let id_m = document.getElementById("selectModelo").value
                //document.getElementById("selectVersao").innerText = ""
                document.getElementById("selectAno").innerText = ""
                versoes(id_m)
            })

        })
        .catch(function (error) {
            console.log(error);
        })
}


function versoes(id_m) {
    var modelo = sessionStorage.getItem('id_marca');
    var modeloversao = modelo + '/' + id_m
    axios.get('http://fipeapi.appspot.com/api/1/carros/veiculo/' + modeloversao + '.json')
        .then(function (response) {
            var versoes = response.data
            for (var i = 0; i < versoes.length; i++) {
                var mpt = versoes[i].veiculo;
                var mptk = versoes[i].key;
                sessionStorage.setItem('id_ano', JSON.stringify(mptk))
                let carAno = sessionStorage.getItem('id_ano')
                let idAno = JSON.parse(carAno)
                //Ano de fabricação
                var elano = document.createElement("option");
                elano.textContent = idAno;
                elano.value = mptk;
                slt_ano.appendChild(elano);
            }
            slt_ano.addEventListener('change', () => {
                let ano_montadora = sessionStorage.getItem('id_marca');
                let ano_modelo = document.getElementById("selectModelo").value
                let ano_versao = document.getElementById("selectAno").value
                let monmodver = ano_montadora + '/' + ano_modelo + '/' + ano_versao
                axios.get('http://fipeapi.appspot.com/api/1/carros/veiculo/'+monmodver+'.json')
                    .then(function (response) {
                        let versoes = response.data
                        let referencia = response.data.referencia
                        let fipe_codigo = response.data.fipe_codigo
                        let name = response.data.name
                        let combustivel = response.data.combustivel
                        let ano_modelo = response.data.ano_modelo
                        let preco = response.data.preco
                        try {
                            document.getElementById("referencia").innerHTML = referencia
                            document.getElementById("fipe_codigo").innerHTML = fipe_codigo
                            document.getElementById("modelo").innerHTML = name
                            document.getElementById("combustivel").innerHTML = combustivel
                            document.getElementById("anoModelo").innerHTML = ano_modelo
                            document.getElementById("valor").innerHTML = preco
                          }
                          catch(err) {
                            //document.getElementById("demo").innerHTML = err.message;
                          }

                    
                        // var fipeTabelavalor = document.createElement("table");
                        // document.getElementById("tabela_valor").appendChild(fipeTabelavalor)
                        // var tr = document.createElement("tr")
                        // var td = document.createElement("td")
                        // let text = document.createTextNode(key);

                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            })

        })
        .catch(function (error) {
            console.log(error);
        })
}








