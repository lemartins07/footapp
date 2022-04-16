/* 
** Sortear Time que começa
quando clicar no botao start:
[x] Sortear capitao que comeca
[x] exibir o nome do time
[x] Ativar primeiro jogador

** Confirmar escolha de jogador
quando clicar no botao start:
[x] Adicionar jogador no array
[x] Eliminar jogador da tabela
[x] Mudar time
[] Ativar o proximo jogador

*/


class Time {
  constructor(cor){
    this.cor = cor;
    this.jogadores = document.querySelectorAll(`.jogador.${cor}`);
    this.jogadorAtivo = document.querySelector(`.jogador.${cor}.ativo`);
    this.jogadoresSelecionados = [];           
  }

  removerAtivo() {
    this.jogadores.forEach(item => item.classList.remove('ativo'))
  }

  ativarJogador() {   
    this.jogadorAtivo = document.querySelector(`.jogador.${this.cor}.ativo`);    
   }

  proximoJogador() {
    this.jogadoresSelecionados++;
    console.log(this.jogadoresSelecionados)
  }  
}

const timePreto = new Time('preto');
const timeBranco = new Time('branco');

const tableRow = document.querySelectorAll('tbody tr');
const btnStart = document.querySelector('#btn-start');
const btnConfirmaJogador = document.querySelector('#btn-confirmar-jogador');
const capitaoEscolha = document.querySelector('#capitao-escolha');
const selecaoLista = document.querySelector('.selecao-lista');
const campoEsquerdo = document.querySelector('.selecao-campo-esquerdo');
const campoDireito = document.querySelector('.selecao-campo-direito');

function handleStart() {
  const numSorted = (Math.floor(Math.random() * 2));  
  
  if(numSorted === 0 ) {
    capitaoEscolha.innerText = 'Preto'; 
    handleFirtPlayerSelect(0);
  } else {
    capitaoEscolha.innerText = 'Branco';
    handleFirtPlayerSelect(1);
  }
  
  selecaoLista.classList.remove('hide');
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
    timePreto.jogadorAtivo.innerHTML = img;    
  } else if (capitaoEscolha.innerText === 'Branco') {
    timeBranco.ativarJogador()    
    timeBranco.jogadorAtivo.innerHTML = img;
  }

  btnConfirmaJogador.classList.remove('hide');
  removeActiveRow();
  
  event.currentTarget.classList.toggle('active-row')  
}

function handleConfirmaJogador(event){
  if (capitaoEscolha.innerText === 'Preto'){
    timePreto.jogadoresSelecionados.push(timePreto.jogadorAtivo);
  }else {
    timeBranco.jogadoresSelecionados.push(timeBranco.jogadorAtivo);
  }
  btnConfirmaJogador.classList.add('hide');
  removeActiveTablePlayer();
  changeTeam();
}

function changeTeam() {
  if (capitaoEscolha.innerText === 'Preto') {       
    capitaoEscolha.innerText = 'Branco'
    timePreto.removerAtivo();    
  } else {    
    capitaoEscolha.innerText = 'Preto'
    timeBranco.removerAtivo();    
  }
  activeNextPlayer();
}  

function activeNextPlayer(){
  const jogadoresEsquerdos = campoEsquerdo.querySelectorAll('.jogador');
  const jogadoresDireitos = campoDireito.querySelectorAll('.jogador');
  
  let ativo = 0;
  
  if (capitaoEscolha.innerText === 'Preto') {
    jogadoresEsquerdos.forEach( item => {    
      let itemContent = item.innerHTML   
      
      if (!itemContent.includes('img') && ativo === 0){      
        item.classList.add('ativo');
        ativo = 1;    
      }   
      
    })
  } else {
    console.log(jogadoresDireitos.length);
    
    let i = 6;
    while ( i >= 0){
      console.log(i, jogadoresDireitos)
      let itemContent = jogadoresDireitos[i].innerHTML; 
      
      if (!itemContent.includes('img') && ativo === 0){      
        jogadoresDireitos[i].classList.add('ativo');
        ativo = 1;    
      }
      i--;   
    }         
  }
}  


function removeActiveTablePlayer(){
  const activeTableRow = document.querySelector('tbody .active-row');  
  activeTableRow.remove();
}

function removeActiveRow() {
  tableRow.forEach( item => item.classList.remove('active-row'));
}

btnStart.addEventListener('click', handleStart);
btnConfirmaJogador.addEventListener('click', handleConfirmaJogador);

tableRow.forEach( item => item.addEventListener('click', handleSelectPlayer));

