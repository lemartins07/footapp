/* quando clicar no botao start:
- Sortear capitao que comeca
- Ativar primeiro jogador
- exibir o nome do capitao 
*/

// class time {
//   constructor(cor){
//     this.jogadores = document.querySelectorAll('.jogador.preto');
//     this.jogadorAtivo = document.querySelector('.jogador.preto.ativo');
//     this.jogadoresSelecionados = 0;
    
//     this.removerAtivo = this.jogadores.forEach(item => item.classList.remove('ativo'));
        
//     ativarJogador() {
//      this.jogadorAtivo = document.querySelector('.jogador.preto.ativo');
//     }

//     proximoJogador() {
//       this.jogadoresSelecionados++;
//       console.log(this.jogadoresSelecionados)
//     }
//   }
// }

const timePreto = {
  jogadores: document.querySelectorAll('.jogador.preto'),
  jogadorAtivo: document.querySelector('.jogador.preto.ativo'),
  jogadoresSelecionados: 0,
  removerAtivo: function() {
    this.jogadores.forEach(item => item.classList.remove('ativo'))
  },
  ativarJogador: function() {
    this.jogadorAtivo = document.querySelector('.jogador.preto.ativo');
  },
  proximoJogador() {
    this.jogadoresSelecionados++;
    console.log(this.jogadoresSelecionados)
  }
}

const timeBranco = {
  jogadores: document.querySelectorAll('.jogador.branco'),
  jogadorAtivo: document.querySelector('.jogador.branco.ativo'),
  jogadoresSelecionados: 0,
  removerAtivo: function () {
    this.jogadores.forEach(item => item.classList.remove('ativo'))
  },
  ativarJogador: function() {
    this.jogadorAtivo = document.querySelector('.jogador.branco.ativo');
  },
  proximoJogador() {
    this.jogadoresSelecionados++;
    console.log(this.jogadoresSelecionados)
  }
}

const tableRow = document.querySelectorAll('tbody tr');
const btnStart = document.querySelector('#btn-start');
const capitaoEscolha = document.querySelector('#capitao-escolha');
const selecaoDisplay = document.querySelector('.selecao-display');

function handleStart() {
  const numSorted = (Math.floor(Math.random() * 2));  
  
  if(numSorted === 0 ) {
    capitaoEscolha.innerText = 'Preto'; 
    handleFirtPlayerSelect(0);
  } else {
    capitaoEscolha.innerText = 'Branco';
    handleFirtPlayerSelect(1);
  }
  
  selecaoDisplay.classList.remove('hide'); 
}

function handleFirtPlayerSelect(time){
  if(time === 0) {
    timePreto.removerAtivo();
    timePreto.jogadores[0].classList.add('ativo');
    timeBranco.removerAtivo();
  } else {
    timeBranco.removerAtivo();
    timeBranco.jogadores[--timeBranco.jogadores.length].classList.add('ativo');
    timePreto.removerAtivo();
  }
}

function handleSelectPlayer(event) {
  const img = event.currentTarget.children[0].innerHTML 

  if (capitaoEscolha.innerText === 'Preto') {
    timePreto.ativarJogador()
    console.log(timePreto)
    timePreto.jogadorAtivo.innerHTML = img;
  } else if (capitaoEscolha.innerText === 'Branco') {
    timeBranco.ativarJogador()
    console.log(timeBranco)
    timeBranco.jogadorAtivo.innerHTML = img;
  }

  removeActiveRow();
  
  event.currentTarget.classList.toggle('active-row')  
}

function removeActiveRow() {
  tableRow.forEach( item => item.classList.remove('active-row'));
}

btnStart.addEventListener('click', handleStart);

tableRow.forEach( item => item.addEventListener('click', handleSelectPlayer));

