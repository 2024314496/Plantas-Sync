// https://brasilapi.com.br/api/feriados/v1/{ano}

function carregarFeriados() {
    fetch(`https://brasilapi.com.br/api/feriados/v1/${new Date().getFullYear()}`, { method: "GET" })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            exibirFeriados(data);
        })
        .catch(error => {
            console.error(error);
            document.getElementById("feriados-result").innerHTML = "<p>Erro ao buscar feriados.</p>";
        });
}
carregarFeriados()

function exibirFeriados(data) {
    if (!data || data.length === 0) {
        document.getElementById("feriados-result").innerHTML = "<p>Nenhum feriado encontrado.</p>";
        return;
    }

    let tabela = `
        <table class="feriados-table">
            <thead>
                <tr>
                    <th class='white'>Data</th>
                    <th class='white'>Feriado</th>
                    <th class='white'>Tipo</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(feriado => {
        const data_formatada = new Date(feriado.date).toLocaleDateString('pt-BR');
        tabela += `
                <tr>
                    <td>${data_formatada}</td>
                    <td>${feriado.name}</td>
                    <td><span class="tipo-badge">${feriado.type}</span></td>
                </tr>
        `;
    });

    tabela += `
            </tbody>
        </table>
    `;

    document.getElementById("feriados-result").innerHTML = tabela;
}

// https://brasilapi.com.br/api/banks/v1

function carregarBancos() {
    fetch(`https://brasilapi.com.br/api/banks/v1`, { method: "GET" })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            exibirBancos(data);
        })
        .catch(error => {
            console.error(error);
            document.getElementById("bancos-result").innerHTML = "<p>Erro ao buscar bancos.</p>";
        });
}

carregarBancos()

function exibirBancos(data) {
    if (!data || data.length === 0) {
        document.getElementById("bancos-result").innerHTML = "<p>Nenhum banco encontrado.</p>";
        return;
    }

    const bancosSelecionados = [];
    const indices = new Set();
    
    while (indices.size < 3 && indices.size < data.length) {
        indices.add(Math.floor(Math.random() * data.length));
    }
    
    indices.forEach(index => {
        bancosSelecionados.push(data[index]);
    });

    let cards = '<div class="bancos-container">';

    bancosSelecionados.forEach(banco => {
        cards += `
            <div class="banco-card">
                <div class="banco-code">${banco.code}</div>
                <h3 class="banco-nome">${banco.name}</h3>
                <p class="banco-fullname">${banco.fullName}</p>
                <div class="banco-ispb">ISPB: ${banco.ispb}</div>
            </div>
        `;
    });

    cards += '</div>';
    document.getElementById("bancos-result").innerHTML = cards;
}

// https://brasilapi.com.br/api/cambio/v1/moedas

function carregarMoedas() {
    fetch(`https://brasilapi.com.br/api/cambio/v1/moedas`, { method: "GET" })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            exibirMoedas(data);
        })
        .catch(error => {
            console.error(error);
            document.getElementById("moedas-result").innerHTML = "<p>Erro ao buscar moedas.</p>";
        });
}

function exibirMoedas(data) {
    if (!data || data.length === 0) {
        document.getElementById("moedas-result").innerHTML = "<p>Nenhuma moeda encontrada.</p>";
        return;
    }

    let tabela = `
        <table class="moedas-table">
            <thead>
                <tr>
                    <th class='white'>Símbolo</th>
                    <th class='white'>Nome</th>
                    <th class='white'>Tipo</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach(moeda => {
        tabela += `
                <tr>
                    <td><span class="moeda-simbolo">${moeda.simbolo}</span></td>
                    <td>${moeda.nome}</td>
                    <td><span class="tipo-moeda-badge">${moeda.tipo_moeda}</span></td>
                </tr>
        `;
    });

    tabela += `
            </tbody>
        </table>
    `;

    document.getElementById("moedas-result").innerHTML = tabela;
}

// Carregar moedas ao abrir a página
window.addEventListener('load', carregarMoedas);