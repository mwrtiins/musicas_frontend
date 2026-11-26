const urlBackend = "https://musicas-backend-matheus.vercel.app"

const listarMusicas = document.getElementById("listarMusicas")

async function buscarMusicas() {
    const resposta = await fetch(urlBackend)
    const musicas = await resposta.json()

    musicas.forEach((musica) => {
        listarMusicas.innerHTML += `
            <article class="musica">
            <h2>${musica.titulo}</h2>
            <p>Artista: ${musica.artista}</p>
            <p>Gênero: ${musica.genero}</p>
            <p>Duração: ${musica.duracao}</p>
            <p>Ano: ${musica.ano}</p>
            <div class="acoes">
                    <a class="editar" href="editar.html?id=1">Editar</a>
                    <button class="apagar" onclick="apagarMusica(${musica.id})">Apagar</button>
                </div>
            </article>

        
        `
    })
}

buscarMusicas();


async function apagarMusica(id) {
    const confirmou = confirm("Tem certeza que quer apagar essa música?")

    if (!confirmou) {
        return
    }

    const resposta = await fetch(`${urlBackend}/apagar/${id}`, {
        method: "DELETE"
    })

    const respostaTransformada = await resposta.json()

    alert(respostaTransformada.mensagem)

    window.location.reload()
}