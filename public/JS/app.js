const ARMAZENAMENTO_KEY = 'participantesGuerra';

function obterEstadoSalvo() {
  const salvo = localStorage.getItem(ARMAZENAMENTO_KEY);
  return salvo ? JSON.parse(salvo) : {};
}

function salvarEstado(estado) {
  localStorage.setItem(ARMAZENAMENTO_KEY, JSON.stringify(estado));
}

async function carregarMembros() {
  const response = await fetch('/api/clan');
  const data = await response.json();
  const lista = document.getElementById('clan-members');
  lista.innerHTML = '';

  const estadoSalvo = obterEstadoSalvo();

  (data.items || []).forEach(membro => {
    const li = document.createElement('li');
    li.className = "flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100";

    // Cria checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-checkbox text-blue-600';
    checkbox.checked = estadoSalvo[membro.tag] || false;  // marca se estiver salvo

    // Quando clicar, atualiza o estado salvo
    checkbox.addEventListener('change', () => {
      const estadoAtual = obterEstadoSalvo();
      estadoAtual[membro.tag] = checkbox.checked;
      salvarEstado(estadoAtual);
    });

    // Monta o conteúdo do li
    li.innerHTML = `<span>${membro.name}</span>`;
    const label = document.createElement('label');
    label.className = 'flex items-center space-x-2';
    label.appendChild(checkbox);
    const spanLabel = document.createElement('span');
    spanLabel.textContent = 'Vai pra guerra';
    label.appendChild(spanLabel);

    li.appendChild(label);
    lista.appendChild(li);
  });
}

carregarMembros();