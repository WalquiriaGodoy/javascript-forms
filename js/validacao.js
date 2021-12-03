export function valida(input){
    const tipoDeInput = input.dataset.tipo

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }
    if (input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    }else{
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio'
    },
    email: {
        valueMissing: 'O campo de email não pode estar vazio',
        typeMismatch: 'O email digitado não é válido'
    },
    senha: {
        valueMissing: 'O campo de senha nao pode estar vazio',
        patternMismatch:'A senha deve conter entre 6 e 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos.'
    },
    dataNascimento:{
        valueMissing: 'O campo data de nascimento não pode estar vazio',
        customError: 'Você deve ser maior de 18 anos para se cadastrar.'
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio',
        customError: 'O CPF digitado não é válido '
    }
}

const validadores = {
    dataNascimento:input => validaDataNascimento(input),
    cpf:input => validaCPF(input)
}

function mostraMensagemDeErro(tipoDeInput, input){
    let mensagem = ''
    tiposDeErro.forEach(erro =>{
        if (input.validity[erro]){
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })   

    return mensagem
}

function validaDataNascimento(input) {
    const dataRecebida = new Date (input.value)
    let mensagem = ''

    if(!maiorQue18(dataRecebida)) {
        mensagem = 'Você deve ter mais de 18 anos'
    }

    input.setCustomValidity(mensagem)   //propriedade do input que faz a validação
}

//TODO:Fazer funcionar a função maiorQue18 e alterar o campo da data para dd/mm/aaaa

function maiorQue18(data) {
    const dataAtual = new Date() //coloca automaticamente a data atual
    const dataMais18 = new Date(data.getUTCFullYear() +18, data.getUTCMonth(), data.getUTCDate())  //data que o javascript espera: ano, mês e dia
    
    return dataMais18 <= dataAtual
}

function validaCPF(input) {
    const cpfFormatado = input.value.replace(/\D/g, '')
    let mensagem = ''

    if (!checaCPFRepetido(cpfFormatado)|| !cpfEhValido(cpfFormatado)){
        mensagem = 'O CPF digitado não é válido'
    }

    input.setCustomValidity(mensagem)
}

function checaCPFRepetido(cpf) {
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    let cpfValido = true

    valoresRepetidos.forEach(valor => {
        if(valor == cpf){
            cpfValido = false
        }
        
    })
    return cpfValido

}

function cpfEhValido(cpf){
        let Soma;
        let Resto;
        Soma = 0;

        if (cpf == "00000000000") return false;

        for (let i = 1; i <=9; i++){
            Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
        }

        Resto = (Soma * 10) % 11;// % ou mod, retorna o resto da divisão

        if ((Resto == 10) || (Resto == 11)){ 
            Resto = 0;
        } 

        if (Resto != parseInt(cpf.substring(9, 10)) ){
            return false;
        }

        Soma = 0;
        
        for (let i = 1; i <= 10; i++){
            Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        }

        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)){
            Resto = 0;
        } 

        if (Resto != parseInt(cpf.substring(10, 11) ) ) {
            return false;
        }

        return true;
    }