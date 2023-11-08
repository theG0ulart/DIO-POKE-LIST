const loadMore = document.getElementById('loadMore');
const pokemonList = document.getElementById('pokemonList');

const limit = 10
let offset = 0


function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
                    <span class="id">#${pokemon.id}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="details">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>

                        <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                    </div>
                </li>
                `
}


function loadPokemonItens(offset, limit) {
      pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
            const newHTML = pokemons.map(convertPokemonToLi).join('')            
            pokemonList.innerHTML += newHTML

    })
}

loadPokemonItens(offset, limit)

loadMore.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})
    