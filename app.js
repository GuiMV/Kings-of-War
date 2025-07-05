const supabase = window.supabase.createClient(
  'https://bzuamrkdatzjesymtwtb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6dWFtcmtkYXR6amVzeW10d3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NjM4MzgsImV4cCI6MjA2NzIzOTgzOH0.9FsTFq2M-XMn_TZgKLXWBjykH4mkjxxYYotF-2jtDnA'
);

let ordemLivre = false;

async function carregarMembros() {
  const ordem = ordemLivre ? 'ordem' : 'nome';

  const { data, error } = await supabase
    .from('membros')
    .select('*')
    .order(ordem, { ascending: true })
    .limit(50);

  if (error) {
    console.error('Erro ao buscar membros:', error);
    return;
  }

  const lista = document.getElementById('lista-membros');
  lista.innerHTML = '';

  data.forEach((membro, index) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center bg-white p-3 rounded shadow';
    li.setAttribute('draggable', ordemLivre);
    li.dataset.id = membro.id;
    li.dataset.index = index;

    const nome = document.createElement('span');
    nome.textContent = `${index + 1}. ${membro.nome}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = membro.vai;

    checkbox.addEventListener('change', async () => {
      await supabase
        .from('membros')
        .update({ vai: checkbox.checked })
        .eq('id', membro.id);
    });

    const remover = document.createElement('button');
    remover.textContent = 'X';
    remover.className = 'ml-10 text-red-500';
    remover.onclick = async () => {
      await supabase.from('membros').delete().eq('id', membro.id);
      carregarMembros();
    };

    const controle = document.createElement('div');
    controle.className = 'flex items-center gap-x-10';
    controle.appendChild(checkbox);
    controle.appendChild(remover);

    li.appendChild(nome);
    li.appendChild(controle);
    lista.appendChild(li);

    if (ordemLivre) {
      li.addEventListener('dragstart', handleDragStart);
      li.addEventListener('dragover', handleDragOver);
      li.addEventListener('drop', handleDrop);
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  carregarMembros();

  const botaoAdicionar = document.getElementById('adicionar');
  botaoAdicionar.addEventListener('click', async () => {
    const { data: membros } = await supabase.from('membros').select('id');
    if (membros.length >= 50) {
      alert('Limite de 50 membros atingido!');
      return;
    }

    const nomeInput = document.getElementById('novo-nome');
    const nome = nomeInput.value.trim();

    if (!nome) return;

    await supabase.from('membros').insert([{ nome, vai: false }]);
    nomeInput.value = '';
    carregarMembros();
  });

  const botaoOrdenar = document.getElementById('ordenar');
  botaoOrdenar.addEventListener('click', () => {
    ordemLivre = false;
    carregarMembros();
  });

  const botaoOrdemLivre = document.getElementById('ordem-livre');
  botaoOrdemLivre.addEventListener('click', () => {
    ordemLivre = !ordemLivre;
    botaoOrdemLivre.textContent = ordemLivre ? 'OL: Ativo' : 'OL';
    carregarMembros();
  });
});

// Drag-and-drop
let dragSrcEl = null;

function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.outerHTML);
}

function handleDragOver(e) {
  e.preventDefault();
  return false;
}

function handleDrop(e) {
  e.preventDefault();
  if (dragSrcEl !== this) {
    const lista = document.getElementById('lista-membros');
    dragSrcEl.remove();
    this.insertAdjacentHTML('beforebegin', e.dataTransfer.getData('text/html'));

    atualizarOrdemNoBanco();
  }
}

async function atualizarOrdemNoBanco() {
  const itens = document.querySelectorAll('#lista-membros li');
  for (let i = 0; i < itens.length; i++) {
    const id = itens[i].dataset.id;
    await supabase.from('membros').update({ ordem: i }).eq('id', id);
  }
  carregarMembros();
}