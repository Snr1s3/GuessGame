var pkmName;
let counter = 0;
window.onload = function() {
    newPkm();
}

function newPkm(){
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
                })
                .catch(error => console.error('Error:', error));
        });
   
    
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
function UpdateScore(score){
    document.getElementById('streak').textContent = 'Streak: ' + score;
}
document.getElementById('form').addEventListener('submit', function(event){
    event.preventDefault();
    var userInput = document.getElementById('userInput').value; 
    if(userInput.toLowerCase()==pkmName){
        console.log('Trobat');
        counter++;
        UpdateScore(counter);
        newPkm();
    }
    else{
        alert("Wrong Pokémon, it was "+pkmName)
        location.reload();
    }
    document.getElementById('userInput').value = '';
});