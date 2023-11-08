const pokeApi = {}


function convertPokeApiDatailToPokemon(pokemonsDetails) {
    const pokemon = new Pokemon()
    pokemon.name = pokemonsDetails.name;
    pokemon.id = pokemonsDetails.id;


    const types = pokemonsDetails.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokemonsDetails.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDatailToPokemon)
}

pokeApi.getPokemons = function (offset = 0, limit = 10) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) =>  pokemonsDetails)
}


