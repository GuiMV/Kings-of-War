async function carregarMembros() {
  const response = await fetch('/api/clan');
  const data = await response.json();

  const lista = document.getElementById('clan-members');
  lista.innerHTML = '';

  const estado = await fetch('/api/estado').then(res => res.json());

  (data.items || []).forEach(membro => {
    const li = document.createElement('li');
    li.className = "flex justify-between items-center p-3 bg-white rounded shadow";

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = estado[membro.tag] || false;
    checkbox.className = 'form-checkbox text-green-600 h-5 w-5';

    checkbox.addEventListener('change', async () => {
      await fetch('/api/estado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: membro.tag, ativo: checkbox.checked })
      });
      li.classList.toggle('bg-green-100', checkbox.checked);
    });

    li.classList.toggle('bg-green-100', checkbox.checked);

    li.innerHTML = `<span class="font-medium">${membro.name}</span>`;
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