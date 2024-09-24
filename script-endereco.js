document.getElementById('cepForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cep = document.getElementById('cep').value;
    if (cep) {
        fetchAddress(cep);
    }
});

function fetchAddress(cep) {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado!');
            } else {
                document.getElementById('logradouro').textContent = data.logradouro;
                document.getElementById('bairro').textContent = data.bairro;
                document.getElementById('localidade').textContent = data.localidade;
                document.getElementById('uf').textContent = data.uf;
                document.getElementById('result').style.display = 'block';
            }
        })
        .catch(error => {
            alert('Erro ao consultar o CEP!');
        })
        .finally(() => {
            document.getElementById('loading').style.display = 'none';
        });
}
