const inputCEP = document.getElementById('cep')
const btnBuscar = document.getElementById('buscar')
const divResultado = document.getElementById('resultado')

async function consultarCEP(){
    const cep = inputCEP.value
    const url = `https://viacep.com.br/ws/${cep}/json/`

    try{
        const resp = await fetch (url, {method: 'GET'})

        const data = await resp.json()

        divResultado.innerHTML = 
         `<h2>Endereço Encontrado</h2>
    <ul>
        <li>CEP: ${data.cep}</li>
        <li>Logradouro: ${data.logradouro}</li>
        <li>Complemento: ${data.complemento}</li>
        <li>Bairro: ${data.bairro}</li>
        <li>Estado: ${data.uf}</li>
        <li>Cidade: ${data.localidade}</li>
    </ul>`
    }catch(error){
        divResultado.innerHTML = 'Erro Inesperado'
    }
}
btnBuscar.addEventListener('click',consultarCEP)