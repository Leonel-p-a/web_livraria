// MENU HAMBÚRGUER DE TODAS AS PÁGINAS
function clickMenu() {
  const menu = document.getElementById('menu');
  if (menu.style.display == 'block') {
      menu.style.display = 'none';
  } else {
      menu.style.display = 'block';
  }
}

// CARD/MODAL DA PÁGINA DE NOVIDADES
document.addEventListener('DOMContentLoaded', function() {
  // Data dinâmica da página de novidades
  const data = new Date();
  
  function adicionarZero(num) {
      return num < 10 ? '0' + num : num;
  }
  
  const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  const dia = adicionarZero(data.getDate());
  const mes = meses[data.getMonth()];
  const ano = data.getFullYear();
  const dataFormatada = `${dia} de ${mes}, ${ano}`;
  
  const dataASerExibida = document.getElementById('data');
  if (dataASerExibida) {
      dataASerExibida.innerText = dataFormatada;
  }
  
  // Modais de novidades
  const botoesLeiaMais = document.querySelectorAll('.botao-destaque-leia-mais');
  const modais = document.querySelectorAll('.modal-destaque');
  const botoesFechar = document.querySelectorAll('.fechar-modal');
  
  botoesLeiaMais.forEach((botao, index) => {
      botao.addEventListener('click', () => {
          modais[index].style.display = 'flex';
      });
  });
  
  botoesFechar.forEach((botao, index) => {
      botao.addEventListener('click', () => {
          modais[index].style.display = 'none';
      });
  });
  
  window.addEventListener('click', (e) => {
      modais.forEach((modal) => {
          if (e.target === modal) {
              modal.style.display = 'none';
          }
      });
  });
  
  // função de visualizar senha no formulário
  const botaoMostrarSenha = document.getElementById('botao-mostrar-senha');
  if (botaoMostrarSenha) {
      const icone = botaoMostrarSenha.querySelector('i');
      
      botaoMostrarSenha.addEventListener('click', function(event) {
          event.preventDefault();
          mostrarSenha();
      });
      
      function mostrarSenha() {
          const inputSenha = document.getElementById('senha');
          
          if (inputSenha.type === "password") {
              inputSenha.type = "text";
              icone.classList.remove('fa-eye');
              icone.classList.add('fa-eye-slash');
          } else {
              inputSenha.type = "password";
              icone.classList.remove('fa-eye-slash');
              icone.classList.add('fa-eye');
          }
      }
  }
  
  // Formulário de inscrição
  const form = document.getElementById('formulario-inscricao');
  if (form) {
      const modal = document.getElementById('modal-inscricao');
      const botaoFecharModal = document.getElementById('fechar-modal-inscricao');
      
      form.addEventListener('submit', function(event) {
          event.preventDefault();
          
          const email = document.getElementById('email').value;
          const senha = document.getElementById('senha').value;
          
          if (email.trim() === '' || senha.trim() === '') {
              alert('Por favor, preencha todos os campos!');
              return;
          }
          
          modal.style.display = 'flex';
      });
      
      if (botaoFecharModal) {
          botaoFecharModal.addEventListener('click', function() {
              modal.style.display = 'none';
              form.reset();
              
              const icone = document.getElementById('botao-mostrar-senha').querySelector('i');
              icone.classList.remove('fa-eye-slash');
              icone.classList.add('fa-eye');
              document.getElementById('senha').type = "password";
          });
      }
  }
  
  // Formulário de contato
  const formularioContato = document.getElementById('formulario-contato');
  if (formularioContato) {
      const modalContato = document.getElementById('modal-contato');
      const botaoFecharModalContato = document.getElementById('fechar-modal-contato');
      
      formularioContato.addEventListener('submit', function(event) {
          event.preventDefault();
          
          const nomeContato = document.getElementById('nome-contato').value;
          const emailContato = document.getElementById('email-contato').value;
          const mensagemContato = document.getElementById('mensagem-contato').value;
          
          if (nomeContato.trim() === '' || emailContato.trim() === '' || mensagemContato.trim() === '') {
              alert('Por favor, preencha todos os campos!');
              return;
          }
          
          modalContato.style.display = 'flex';
      });
      
      if (botaoFecharModalContato) {
          botaoFecharModalContato.addEventListener('click', function() {
              modalContato.style.display = 'none';
              formularioContato.reset();
          });
      }
  }
  
  // Carrinho de Compras
  let carrinho = [];
  
  const botoesAdicionar = document.querySelectorAll('.botao-adicionar');
  const modalCarrinho = document.getElementById('modal-carrinho');
  const carrinhoIcon = document.querySelector('.carrinho-icon');
  const carrinhoContador = document.getElementById('carrinho-contador');
  const itensCarrinhoContainer = document.getElementById('itens-carrinho');
  const totalCarrinhoElement = document.getElementById('total-carrinho');
  const botaoFinalizar = document.getElementById('botao-finalizar');
  const conteudoCarrinho = document.getElementById('conteudo-carrinho');
  const formPagamento = document.getElementById('form-pagamento');
  const formularioPagamento = document.getElementById('formulario-pagamento');
  const mensagemSucesso = document.getElementById('mensagem-sucesso');
  const fecharModalCarrinho = document.getElementById('fechar-modal-carrinho');
  
  // Abrir modal do carrinho ao clicar no ícone
  if (carrinhoIcon) {
      carrinhoIcon.addEventListener('click', () => {
          atualizarCarrinhoUI();
          modalCarrinho.style.display = 'flex';
      });
  }
  
  // Fechar modal ao clicar fora
  window.addEventListener('click', (e) => {
      if (e.target === modalCarrinho) {
          modalCarrinho.style.display = 'none';
      }
  });
  
  // Para cada botão "Adicionar", adiciona evento de clique
  botoesAdicionar.forEach(botao => {
      botao.addEventListener('click', () => {
          const livroElement = botao.closest('.book');
          const titulo = livroElement.querySelector('.titulo').textContent;
          const autor = livroElement.querySelector('.autor').textContent;
          const precoTexto = livroElement.querySelector('.preco').textContent;
          const preco = parseFloat(precoTexto.replace('R$ ', '').replace(',', '.'));
          const imagemSrc = livroElement.querySelector('img').src;
          
          adicionarAoCarrinho({ titulo, autor, preco, imagemSrc });
      });
  });

  carregarCarrinho();
  
  // Função para adicionar item ao carrinho
  function adicionarAoCarrinho(livro) {
      // Verifica se o livro já está no carrinho
      const livroExistente = carrinho.find(item => item.titulo === livro.titulo);
      
      if (livroExistente) {
          livroExistente.quantidade += 1;
      } else {
          carrinho.push({ ...livro, quantidade: 1 });
      }
      
      atualizarCarrinhoUI();
      salvarCarrinho();
      mostrarNotificacao('Livro adicionado ao carrinho!');
  }

    // Funções para salvar e carregar o carrinho no localStorage
  function salvarCarrinho() {
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  function carregarCarrinho() {
      const carrinhoSalvo = localStorage.getItem('carrinho');
      if (carrinhoSalvo) {
          carrinho = JSON.parse(carrinhoSalvo);
          atualizarCarrinhoUI();
      }
  }
  
  // Função para mostrar notificação
  function mostrarNotificacao(mensagem) {
      const notificacao = document.createElement('div');
      notificacao.className = 'notificacao-carrinho';
      notificacao.textContent = mensagem;
      document.body.appendChild(notificacao);
      
      setTimeout(() => {
          notificacao.classList.add('fade-out');
          setTimeout(() => {
              document.body.removeChild(notificacao);
          }, 500);
      }, 2000);
  }
  
  // Função para atualizar a UI do carrinho
  function atualizarCarrinhoUI() {
      // Atualiza contador
      const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
      if (carrinhoContador) carrinhoContador.textContent = totalItens;
      
      // Atualiza lista de itens
      if (itensCarrinhoContainer) {
          itensCarrinhoContainer.innerHTML = '';
          
          if (carrinho.length === 0) {
              itensCarrinhoContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
              if (totalCarrinhoElement) totalCarrinhoElement.textContent = '0,00';
              return;
          }
          
          carrinho.forEach((item, index) => {
              const itemElement = document.createElement('div');
              itemElement.className = 'item-carrinho';
              itemElement.innerHTML = `
                  <img src="${item.imagemSrc}" alt="${item.titulo}" width="50">
                  <div class="item-carrinho-info">
                      <h4>${item.titulo}</h4>
                      <p>${item.autor}</p>
                      <p>R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                  </div>
                  <div class="item-carrinho-acoes">
                      <button class="diminuir-item" data-index="${index}">-</button>
                      <span>${item.quantidade}</span>
                      <button class="aumentar-item" data-index="${index}">+</button>
                      <button class="remover-item" data-index="${index}">Remover</button>
                  </div>
              `;
              itensCarrinhoContainer.appendChild(itemElement);
          });
          
          // Atualiza total
          const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
          if (totalCarrinhoElement) totalCarrinhoElement.textContent = total.toFixed(2).replace('.', ',');
          
          // Adiciona eventos aos botões de quantidade
          document.querySelectorAll('.diminuir-item').forEach(botao => {
              botao.addEventListener('click', (e) => {
                  const index = e.target.getAttribute('data-index');
                  diminuirQuantidade(index);
              });
          });
          
          document.querySelectorAll('.aumentar-item').forEach(botao => {
              botao.addEventListener('click', (e) => {
                  const index = e.target.getAttribute('data-index');
                  aumentarQuantidade(index);
              });
          });
          
          document.querySelectorAll('.remover-item').forEach(botao => {
              botao.addEventListener('click', (e) => {
                  const index = e.target.getAttribute('data-index');
                  removerItem(index);
              });
          });
      }
  }
  
  // Funções para manipular o carrinho
  function aumentarQuantidade(index) {
      carrinho[index].quantidade += 1;
      atualizarCarrinhoUI();
      salvarCarrinho();
  }
  
  function diminuirQuantidade(index) {
      if (carrinho[index].quantidade > 1) {
          carrinho[index].quantidade -= 1;
      } else {
          carrinho.splice(index, 1);
      }
      atualizarCarrinhoUI();
      salvarCarrinho();
  }
  
  function removerItem(index) {
      carrinho.splice(index, 1);
      atualizarCarrinhoUI();
      salvarCarrinho();
  }
  
  // Botão Finalizar Compra
  if (botaoFinalizar) {
      botaoFinalizar.addEventListener('click', () => {
          if (conteudoCarrinho) conteudoCarrinho.style.display = 'none';
          if (formPagamento) formPagamento.style.display = 'block';
      });
  }
  
  // Formulário de Pagamento
  if (formularioPagamento) {
      formularioPagamento.addEventListener('submit', (e) => {
          e.preventDefault();
          
          // Validação simples
          const nome = document.getElementById('nome').value;
          const cpf = document.getElementById('cpf').value;
          const cartao = document.getElementById('cartao').value;
          const cvv = document.getElementById('cvv').value;
          
          if (!nome || !cpf || !cartao || !cvv) {
              alert('Por favor, preencha todos os campos!');
              return;
          }
          
          // Simula processamento do pagamento
          if (formPagamento) formPagamento.style.display = 'none';
          if (mensagemSucesso) mensagemSucesso.style.display = 'block';
          
          // Limpa o carrinho após 3 segundos e fecha o modal
          setTimeout(() => {
              carrinho = [];
              atualizarCarrinhoUI();
              
              setTimeout(() => {
                  if (modalCarrinho) modalCarrinho.style.display = 'none';
                  if (mensagemSucesso) mensagemSucesso.style.display = 'none';
                  if (conteudoCarrinho) conteudoCarrinho.style.display = 'block';
                  if (formularioPagamento) formularioPagamento.reset();
              }, 2000);
          }, 3000);
      });
  }
  
  // Fechar modal ao clicar no X
  if (fecharModalCarrinho) {
      fecharModalCarrinho.addEventListener('click', () => {
          if (modalCarrinho) modalCarrinho.style.display = 'none';
          // Volta para a visualização do carrinho se estiver no formulário
          if (formPagamento) formPagamento.style.display = 'none';
          if (mensagemSucesso) mensagemSucesso.style.display = 'none';
          if (conteudoCarrinho) conteudoCarrinho.style.display = 'block';
      });
  }
});