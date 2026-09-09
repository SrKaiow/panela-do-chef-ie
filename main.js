// main.js

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('ano').textContent = new Date().getFullYear();

  // Menu mobile
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  navToggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  // Lightbox da galeria
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.galeria-item').forEach((item) => {
    item.addEventListener('click', () => {
      lightboxImg.src = item.dataset.full;
      lightboxImg.alt = item.querySelector('img').alt;
      lightbox.classList.add('open');
    });
  });

  function fecharLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }

  lightboxClose.addEventListener('click', fecharLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) fecharLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharLightbox();
  });

  // Formulário de contato
  const form = document.getElementById('form-contato');
  const formMsg = document.getElementById('form-msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formMsg.className = 'form-msg';

    const botao = form.querySelector('button[type="submit"]');
    botao.disabled = true;
    botao.textContent = 'Enviando...';

    const dados = {
      nome: document.getElementById('nome').value.trim(),
      email: document.getElementById('email').value.trim(),
      mensagem: document.getElementById('mensagem').value.trim(),
    };

    try {
      const resposta = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });
      const resultado = await resposta.json();

      if (!resposta.ok || !resultado.success) {
        throw new Error(resultado.error || 'Não foi possível enviar sua mensagem.');
      }

      formMsg.textContent = 'Mensagem enviada! Vamos responder em breve.';
      formMsg.classList.add('show', 'ok');
      form.reset();
    } catch (erro) {
      formMsg.textContent = erro.message;
      formMsg.classList.add('show', 'erro');
    } finally {
      botao.disabled = false;
      botao.textContent = 'Enviar mensagem';
    }
  });
});
