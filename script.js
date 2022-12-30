//acessos ao DOM
const texto = document.querySelector("textarea");
const btnCripto = document.querySelector("#cripto");
const btnDescripto = document.querySelector("#descripto");
const btnCopiar = document.querySelector("#copiar");
const btnApagar = document.querySelector("#apagar");
const textoAviso = document.querySelector("#avisos");

//objeto com palavras para cripto/descripto
const chaves = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
}

let t; //controlar temporizador de mensagens
let isCripto = false; //variavel para impedir acao durante o processo de cripto/decripto

const criptografar = () => {
    
    if(texto.value == '') {
        textoAlerta('digite um texto para criptografar');
        return false;
    }

    if(!checarAcentuacao(texto.value) || isCripto) 
        return false;

    let textoAtual = texto.value;
    let novoTexto = '';

    //buscamos se alguma palavra digitada está no objeto chaves
    //se sim, convertemos com o respectivo valor e concatemos na nova string
    for(let i = 0; i < textoAtual.length; ++i) {
        if(chaves[textoAtual[i]]) {
            novoTexto += chaves[textoAtual[i]];
        } else {
            novoTexto += textoAtual[i];
        }
    }
    //efeito mensagem criptografando e sumindo depois de 2s
    texto.value = "criptografando..";
    isCripto = true;
    texto.classList.add("efeito");
    setTimeout(() => {
        texto.value = novoTexto;
        texto.classList.remove("efeito");
        textoAlerta("texto criptografado");
        isCripto = false;
    }, 2000)
}

const descriptografar = () => {

    if(texto.value == '') {
        textoAlerta('digite um texto para descriptografar');
        return false;
    }
    if(!checarAcentuacao(texto.value) || isCripto) 
        return false;

    let textoAtual = texto.value.split(" ");
    //converto meu texto em uma array de strings a parti do espaco

    //logica utilizada: converto as chaves do objeto e percorro cada uma delas
    let valoresObj = Object.values(chaves);
    valoresObj.forEach(valor => {
        for(let i = 0; i < textoAtual.length; ++i) {
            //checo se alguma chave esta presente no meu texto com includes
            if(textoAtual[i].includes(valor)) {
                let key = Object.keys(chaves).find(k => chaves[k] == valor);
                //se estiver, pego o valor da chave com a variavel key e substituo todas ocorrencias dela no meu texto
                textoAtual[i] = textoAtual[i].replaceAll(valor, key);
            } 
        }
    })

    texto.value = "descriptografando..";
    isCripto = true;
    texto.classList.add("efeito");
    setTimeout(() => {
        texto.value = textoAtual.join(" ");
        texto.classList.remove("efeito");
        textoAlerta("texto descriptografado");
        isCripto = false;
    }, 3000)
}

//funcao copiar texto
const copiarTexto = () => {
    if(texto.value == '') {
        return;
    }
    textoAlerta('texto copiado');
    texto.select();
    document.execCommand("copy");
}

//funcao apagar texto
const apagarTexto = () => {
    textoAlerta('texto apagado');
    texto.value = '';
}

//funcao para sistema de alertas
const textoAlerta = (alerta) => {
    clearTimeout(t);
    textoAviso.innerText = '! '+ alerta;
    t = setTimeout(() => {
        textoAviso.innerText = "..."
    }, 3000)
}

//checar se o texto digitado tem algum acento
const checarAcentuacao = (string) => {
    string = string.trim();
    let matches = /[ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöùúûüýþÿ]/.test(string);
    if(matches) {
        textoAlerta("somente letras sem acentos");
        return false;
    }
    return true;
}

//eventos DOM
btnCripto.addEventListener("click", criptografar);
btnDescripto.addEventListener("click", descriptografar);
btnCopiar.addEventListener("click", copiarTexto);
btnApagar.addEventListener("click", apagarTexto);