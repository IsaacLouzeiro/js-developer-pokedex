const pokemonList = document.getElementById('pokemonList')

const contentTopToReplace = document.getElementById('contentTopToReplace')
const gridInfoToReplace = document.getElementById('gridInfoToReplace')

const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onClick="openModal(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function infoPokemonTop(pokemon) {
    return `
        <div class="modalPokemon">
            <div class="nameAndTypes">
                <span class="name">${pokemon.name}</span>
                <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
            </div>
            
            <span class="number">#${pokemon.number}</span>
        </div>
        
        <img src="${pokemon.photo}"alt="${pokemon.name}">
    `
}

function aboutPokemonContent(pokemon) {
    return `
        <li class="title">Base Experience</li>
        <li>${pokemon.baseExperience}</li>

        <li class="title">Height</li>
        <li>${pokemon.height}</li>

        <li class="title">Weight</li>
        <li>${pokemon.weight}</li>

        <li class="title">Abilities</li>
        <ol>
            ${pokemon.abilities.map((ability) => `<li>${ability}</li>`).join('')}
        </ol>

        <li class="title">Images</li>
        <ol>
            <li><img src="${pokemon.front_photo}"alt="${pokemon.name}"></li>
            <li><img src="${pokemon.back_photo}"alt="${pokemon.name}"></li>
        </ol>
    `
}

function loadPokemonItems(offset, limit, id = 0) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function loadPokemonItemsModal(offset, limit, id = 0) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        contentTopToReplace.innerHTML = infoPokemonTop(pokemons[id])
        gridInfoToReplace.innerHTML = aboutPokemonContent(pokemons[id])
        modalContent.classList.add(pokemons[id].type)
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }
})