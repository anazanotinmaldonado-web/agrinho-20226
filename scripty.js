/* ==========================================================================
   SIMULADOR DE ESTUFA DE TOMATE - PROJETO AGRINHO
   ========================================================================== */

// 1. Pegando os elementos do HTML para o JavaScript conseguir mexer neles
const sliderTemperatura = document.getElementById('temperatura');
const sliderAgua = document.getElementById('agua');
const sliderFertilizante = document.getElementById('fertilizante');

const valorTemperatura = document.getElementById('valor-temperatura');
const valorAgua = document.getElementById('valor-agua');
const valorFertilizante = document.getElementById('valor-fertilizante');

const imagemTomate = document.getElementById('imagem-tomate');
const statusCaixa = document.getElementById('status-caixa');
const statusTexto = document.getElementById('status-texto');

// 2. Função principal que checa as condições da estufa
function atualizarSimulador() {
    // Pegando os valores atuais dos sliders (convertidos para números inteiros)
    const temp = parseInt(sliderTemperatura.value);
    const agua = parseInt(sliderAgua.value);
    const fert = parseInt(sliderFertilizante.value);

    // Atualiza os numerozinhos que aparecem na tela do lado dos sliders
    valorTemperatura.textContent = temp + "°C";
    valorAgua.textContent = agua + "%";
    valorFertilizante.textContent = fert + "%";

    // Resetando os estilos de alerta antes de fazer a nova checagem
    statusCaixa.classList.remove('status-alerta');

    /* ==========================================================================
       3. LÓGICA DO EQUILÍBRIO (PRODUÇÃO VS MEIO AMBIENTE)
       ========================================================================== */

    // Cenário 1: Excesso de Fertilizante Química (Prejuízo Ambiental)
    if (fert > 70) {
        imagemTomate.src = "imagens/tomate_poluido.png"; // Troque pelo caminho da sua imagem
        statusTexto.textContent = "ALERTA AMBIENTAL: Alta produção, mas o excesso de químicos poluiu o solo e o lençol freático! Não há equilíbrio.";
        statusCaixa.classList.add('status-alerta');
    }
    
    // Cenário 2: Falta de Água ou Frio Extremo (Planta Murcha / Baixa Produção)
    else if (agua < 30 || temp < 15) {
        imagemTomate.src = "imagens/tomate_murcho.png";
        statusTexto.textContent = "PRODUÇÃO BAIXA: A estufa está muito fria ou falta água. O tomateiro está murchando.";
        statusCaixa.classList.add('status-alerta');
    }
    
    // Cenário 3: Excesso de Água e Calor (Desperdício de Recursos / Fungos)
    else if (agua > 80 && temp > 32) {
        imagemTomate.src = "imagens/tomate_doente.png";
        statusTexto.textContent = "DESPERDÍCIO E DOENÇA: Água demais gera desperdício de recursos naturais, e o calor excessivo criou fungos na plantação.";
        statusCaixa.classList.add('status-alerta');
    }
    
    // Cenário 4: O Equilíbrio Perfeito! (Sustentabilidade e Alta Produtividade)
    else if ((temp >= 20 && temp <= 28) && (agua >= 50 && agua <= 70) && (fert >= 10 && fert <= 40)) {
        imagemTomate.src = "imagens/tomate_perfeito.png";
        statusTexto.textContent = "EQUILÍBRIO ATINGIDO! Parabéns! Uso consciente da água, temperatura ideal para o tomate e adubação responsável. Produção alta e meio ambiente protegido!";
    }
    
    // Cenário 5: Condição Instável (Nem tão bom, nem tão ruim)
    else {
        imagemTomate.src = "imagens/tomate_normal.png";
        statusTexto.textContent = "Condições instáveis. O tomate está crescendo, mas ajuste os controles para alcançar o selo de Sustentabilidade Agrinho.";
    }
}

// 4. Ouvintes de Eventos (Fazem o código rodar toda vez que o usuário mexe na barra)
sliderTemperatura.addEventListener('input', atualizarSimulador);
sliderAgua.addEventListener('input', atualizarSimulador);
sliderFertilizante.addEventListener('input', atualizarSimulador);

// Executa a função uma vez ao carregar a página para definir o estado inicial
atualizarSimulador();