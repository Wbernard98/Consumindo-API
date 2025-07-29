// seleção dos elementos html
const jokeDisplay = document.getElementById('joke-display')
const generateBtn = document.getElementById('generate-joke-btn')

// 2 função assincrona para buscar a piada
async function fetchjoke() {
    // feedback de carregamento
    jokeDisplay.textContent = 'Carregando piada ...'
    jokeDisplay.classList.add('Loading') // adiciona uma classe para estilização de carregamento

    try{
        // requisição api
        const response = await fetch('https://api.chucknorris.io/jokes/random')

        //verificação da resposta da rede
        if(!response.ok){
            // se a resposta mão for bem-sucedida (ex:404,500), lança um erro
            throw new Error (`Erro HTTP! Status: ${response.status}`)
        }
        // conversão da resposta para JSON
        const data = await response.json();

        //exibição da piada
        jokeDisplay.textContent = data.value;// pega o valor da piada do objeto json

    }catch(error){
        //tratamento de Erros 
        console.error('Erro ao buscar piada: ', error)
        jokeDisplay.textContent = 'Ops! não foi possivel carregar a piada. Tente Novamente!'
    }finally{
        // finalização do carregamento
        jokeDisplay.classList.remove('Loading')// remove a classe do carregamento 
    }
}
// adição do event listenner
generateBtn.addEventListener('click', fetchjoke)// quando o botão for clicado,a função fetchJoke é executada
 // carregamento inicial
 fetchjoke()// Chama a função 'fetchJoke' uma vez para carregar uma piada assim que a página é carregada
