import axios from 'axios'


export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/'
})

export const getPoke = async (url, setDados, pagina) => {

  if (url === `/pokemon?limit=15&offset=${pagina}`) {
    let promisesPokemons = [];
    api.get(url).then((response) => {
      for (let i = 0; i < response.data.results.length; i++) {
        let urlDoPokemon = response.data.results[i].url.slice(25, 38);
        promisesPokemons.push(api.get(urlDoPokemon).then(response => response.data))
      }

      Promise.all(promisesPokemons).then(pokemons => {
        setDados(pokemons);
      });
    });
  } else {
    const resposta = await api.get(url);
    setDados(resposta.data);
    localStorage.setItem('pokemon_selecionado', resposta.data.name);
  }
}

export const getTypes = async (url, setDados) => {
  let promisesTypes = [];
  api.get(url).then((response) => {
    for (let i = 0; i < response.data.results.length - 2; i++) {
      let urlDoType = response.data.results[i].url.slice(25, 38);
      promisesTypes.push(api.get(urlDoType).then(response => response.data))
    }

    Promise.all(promisesTypes).then(types => {
      setDados(types);
    });
  });
}

// export const getType = async (url, setDado) => {
//   let resposta = api.get(url);
//   console.log(resposta);
//   setDado(resposta)
// }

export function getPokemonsType(pokemonsDoTipo, setDado) {

  let promisesPokemonsDoTipo = [];
  let pokemons = [];

  for (let i = 0; i < pokemonsDoTipo.length; i++) {
    let url = pokemonsDoTipo[i].pokemon.url.slice(25, 39)
    promisesPokemonsDoTipo.push(api.get(url));
  }

  Promise.all(promisesPokemonsDoTipo).then((pokemonsDoTipo) => {
    
    for (let i = 0; i < pokemonsDoTipo.length; i++) {
      pokemons[i] = pokemonsDoTipo[i].data;
    }
    console.log(pokemons);
    setDado(pokemons)
  })
}