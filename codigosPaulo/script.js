const cepForm = document.getElementById('cepForm');
const cepInput = document.getElementById('cep');
const resultado = document.getElementById('resultado');

cepForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const cep = cepInput.value;
    resultado.innerHTML = '<p>Carregando...</p>';

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                resultado.innerHTML = '<p>CEP não encontrado.</p>';
            } else {
                const tabela = document.createElement('table');
                const tbody = document.createElement('tbody');

                for (const chave in data) {
                    if (data.hasOwnProperty(chave)) {
                        const tr = document.createElement('tr');
                        const th = document.createElement('th');
                        const td = document.createElement('td');
                        th.textContent = chave;
                        td.textContent = data[chave];
                        tr.appendChild(th);
                        tr.appendChild(td);
                        tbody.appendChild(tr);
                    }
                }

                tabela.appendChild(tbody);
                resultado.innerHTML = '';
                resultado.appendChild(tabela);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            resultado.innerHTML = '<p>Erro ao consultar o CEP.</p>';
        });
});