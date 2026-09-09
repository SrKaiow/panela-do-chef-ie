require('dotenv').config();

const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();

// A Discloud, pra sites (TYPE=site), exige host 0.0.0.0 e porta 8080.
// Em outros ambientes (rodando local, outro provedor), respeita a env PORT se existir.
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const MENSAGENS_FILE = path.join(__dirname, 'data', 'mensagens.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function lerMensagens() {
  try {
    if (!fs.existsSync(MENSAGENS_FILE)) return [];
    return JSON.parse(fs.readFileSync(MENSAGENS_FILE, 'utf8'));
  } catch (e) {
    console.error('❌ Erro ao ler mensagens salvas:', e);
    return [];
  }
}

function salvarMensagem(msg) {
  const mensagens = lerMensagens();
  mensagens.push(msg);
  fs.writeFileSync(MENSAGENS_FILE, JSON.stringify(mensagens, null, 2), 'utf8');
}

// Recebe o formulário de contato e só salva localmente por enquanto.
// Se quiser receber por e-mail, veja o README (é só plugar um serviço
// como Resend ou Nodemailer aqui).
app.post('/api/contato', (req, res) => {
  const { nome, email, mensagem } = req.body || {};

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: 'Preencha nome, email e mensagem.' });
  }
  if (nome.length > 200 || email.length > 200 || mensagem.length > 5000) {
    return res.status(400).json({ error: 'Um dos campos está maior do que o esperado.' });
  }

  try {
    salvarMensagem({
      nome,
      email,
      mensagem,
      recebido_em: new Date().toISOString(),
    });
    res.json({ success: true });
  } catch (e) {
    console.error('❌ Erro ao salvar mensagem de contato:', e);
    res.status(500).json({ error: 'Não foi possível salvar sua mensagem agora. Tente de novo em alguns minutos.' });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`✅ Site no ar em http://${HOST}:${PORT}`);
});
