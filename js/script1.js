function FIPE(event, element) {
    event.preventDefault();
    let value = document.querySelector(element).value.trim();

    fetch(`https://brasilapi.com.br/api/fipe/preco/v1/${value}`, { method: "GET" })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            exibirTabela(data[0]);
        })
        .catch(error => {
            let resultadoDiv = document.getElementById("resultado");
            if (!resultadoDiv) {
                resultadoDiv = document.createElement("section");
                resultadoDiv.classList.add("container");
                resultadoDiv.id = "resultado";
                document.querySelector("footer").parentElement.insertBefore(resultadoDiv, document.querySelector("footer"));
            }
            resultadoDiv.innerHTML = "Dados Inválidos"
            
        });
}

function exibirTabela(data) {
    let tabela = `
        <table>
            <thead>
                <tr>
                    <th class='white'>Informação</th>
                    <th class='white'>Valor</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Código FIPE</td>
                    <td>${data.codigoFipe || "N/A"}</td>
                </tr>
                <tr>
                    <td>Marca</td>
                    <td>${data.marca || "N/A"}</td>
                </tr>
                <tr>
                    <td>Modelo</td>
                    <td>${data.modelo || "N/A"}</td>
                </tr>
                <tr>
                    <td>Ano Modelo</td>
                    <td>${data.anoModelo || "N/A"}</td>
                </tr>
                <tr>
                    <td>Combustível</td>
                    <td>${data.combustivel || "N/A"}</td>
                </tr>
                <tr>
                    <td>Preço</td>
                    <td>${data.valor || "N/A"}</td>
                </tr>
                <tr>
                    <td>Mês de Referência</td>
                    <td>${data.mesReferencia || "N/A"}</td>
                </tr>
                <tr>
                    <td>Data da Consulta</td>
                    <td>${data.dataConsulta || "N/A"}</td>
                </tr>
            </tbody>
        </table>
    `;

    let resultadoDiv = document.getElementById("resultado");
    if (!resultadoDiv) {
        resultadoDiv = document.createElement("section");
        resultadoDiv.classList.add("container");
        resultadoDiv.id = "resultado";
        document.querySelector("footer").parentElement.insertBefore(resultadoDiv, document.querySelector("footer"));
    }
    resultadoDiv.innerHTML = tabela;
}