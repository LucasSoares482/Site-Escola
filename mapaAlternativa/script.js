document.getElementById('cepForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cep = document.getElementById('cep').value;
    if (cep) {
        fetchAddress(cep);
    }
});

function fetchAddress(cep) {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('addressCard').style.display = 'none';
    document.getElementById('map').style.display = 'none';

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
                document.getElementById('addressCard').style.display = 'block';
                showMap(data.localidade, data.uf);
            }
        })
        .catch(error => {
            alert('Erro ao consultar o CEP!');
        })
        .finally(() => {
            document.getElementById('loading').style.display = 'none';
        });
}

function showMap(city, state) {
    const map = document.getElementById('map');
    map.style.display = 'block';
    const mapUrl = `https://maps.google.com/maps?q=${city},${state}&z=15&output=embed`;
    map.innerHTML = `<iframe width="100%" height="100%" src="${mapUrl}" frameborder="0" style="border:0" allowfullscreen></iframe>`;
}
