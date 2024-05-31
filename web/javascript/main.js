var pkmName;
window.onload = function() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then(data => {
            let pokemonNames = data.results.map(pokemon => pokemon.name);
            let randomPokemonName = pokemonNames[Math.floor(Math.random() * pokemonNames.length)];
            fetch('https://pokeapi.co/api/v2/pokemon/' + randomPokemonName)
                .then(response => response.json())
                .then(pokemonData => {
                    startGame(randomPokemonName, pokemonData.types.map(typeInfo => typeInfo.type.name), pokemonData.id, pokemonData.height, pokemonData.weight, pokemonData.sprites.front_default);
                    pkmName=randomPokemonName;
                });
        });
    var lastPokemon = localStorage.getItem('lastPokemon');  // Retrieve the last guessed Pokémon name
    if (lastPokemon) {
        document.getElementById('lastPokemon').textContent = 'Last Pokémon: ' + lastPokemon;  // Display the last guessed Pokémon
    }
    function startGame(pokemonName, pokemonTypes, pokemonId , pokemonHeight, pokemonWeight, pokemonPhoto) {
        console.log(pokemonName);
        document.getElementById('pokemonToGuess').innerHTML = 
            'Hints:<br>Id: ' + pokemonId +
            '<br>Type/Types: ' + pokemonTypes.join(',') +
            '<br>Height: ' + pokemonHeight +
            '<br>Weight: ' + pokemonWeight+
            '<br><img src="'+pokemonPhoto+'">';
    }
}


document.getElementById('form').addEventListener('submit', function(event){
    event.preventDefault();
    var userInput = document.getElementById('pkmName').value; 
    if(userInput.toLowerCase()==pkmName){
        console.log('Trobat');
        localStorage.setItem('lastPokemon', pkmName);  // Store the last guessed Pokémon name
        location.reload();
    }
    document.getElementById('pkmName').value = '';
});