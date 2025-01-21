document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const iniciarBtn = document.getElementById('iniciar');
    const pausarBtn = document.getElementById('pausar');
    const resetarBtn = document.getElementById('resetar');
    const voltaBtn = document.getElementById('volta');
    const listaVoltas = document.getElementById('lista-voltas');

    let intervalo;
    let tempoDecorrido = 0;
    let estaRodando = false;

    function formatarTempo(ms) {
        const horas = Math.floor(ms / 3600000);
        const minutos = Math.floor((ms % 3600000) / 60000);
        const segundos = Math.floor((ms % 60000) / 1000);
        const milissegundos = Math.floor((ms % 1000) / 10); // Mostra centésimos de segundo
        return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}.${String(milissegundos).padStart(2, '0')}`;
    }

    function atualizarDisplay() {
        display.textContent = formatarTempo(tempoDecorrido);
    }

    function iniciarCronometro() {
        if (!estaRodando) {
            intervalo = setInterval(() => {
                tempoDecorrido += 10; // Aumenta o tempo em 10 milissegundos
                atualizarDisplay();
            }, 10); // Intervalo de 10 milissegundos
            estaRodando = true;
            iniciarBtn.disabled = true;
            pausarBtn.disabled = false;
            resetarBtn.disabled = false;
            voltaBtn.disabled = false;
        }
    }

    function pausarCronometro() {
        if (estaRodando) {
            clearInterval(intervalo);
            estaRodando = false;
            iniciarBtn.disabled = false;
            pausarBtn.disabled = true;
        }
    }

    function resetarCronometro() {
        clearInterval(intervalo);
        tempoDecorrido = 0;
        estaRodando = false;
        atualizarDisplay();
        iniciarBtn.disabled = false;
        pausarBtn.disabled = true;
        resetarBtn.disabled = true;
        voltaBtn.disabled = true;
        listaVoltas.innerHTML = ''; // Limpa a lista de voltas
    }

    function marcarVolta() {
        if (estaRodando) {
            const volta = document.createElement('li');
            volta.textContent = formatarTempo(tempoDecorrido);
            listaVoltas.appendChild(volta);
        }
    }

    iniciarBtn.addEventListener('click', iniciarCronometro);
    pausarBtn.addEventListener('click', pausarCronometro);
    resetarBtn.addEventListener('click', resetarCronometro);
    voltaBtn.addEventListener('click', marcarVolta);
});