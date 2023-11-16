import axios, { AxiosResponse } from 'axios';

export const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

export const getPokemons = async (url: string, setDados: any, pagina: any) => {
  if (url === `/pokemon?limit=15&offset=${pagina}`) {
    let promisesPokemons: Promise<AxiosResponse<any>>[] = [];

    pokeApi.get(url).then((response) => {
      for (let i = 0; i < response.data.results.length; i++) {
        let urlDoPokemon = response.data.results[i].url.slice(25, 38);
        promisesPokemons.push(pokeApi.get(urlDoPokemon).then(response => response.data))
      }

      Promise.all(promisesPokemons).then(pokemons => {
        setDados(pokemons);
      });
    });
  } else {
    const resposta = await pokeApi.get(url);
    setDados(resposta.data);
    localStorage.setItem('pokemon_selecionado', resposta.data.name);
  }
}

export const getTypes = async (url: string, setDados: any) => {
  let promisesTypes: Promise<AxiosResponse<any>>[] = [];

  pokeApi.get(url).then((response) => {
    for (let i = 0; i < response.data.results.length - 2; i++) {
      let urlDoType = response.data.results[i].url.slice(25, 38);
      promisesTypes.push(pokeApi.get(urlDoType).then(response => response.data))
    }

    Promise.all(promisesTypes).then(types => {
      setDados(types);
    });
  });
}

export function getPokemonsType(pokemonsDoTipo: any[], setPokemons: any) {
  console.log(pokemonsDoTipo);
  let promisesPokemonsDoTipo: Promise<AxiosResponse<any>>[] = [];
  let pokemons: any[] = [];

  for (let i = 0; i < pokemonsDoTipo.length; i++) {
    let url = pokemonsDoTipo[i].pokemon.url.slice(25, 39)
    promisesPokemonsDoTipo.push(pokeApi.get(url));
  }

  Promise.all(promisesPokemonsDoTipo).then((pokemonsDoTipo) => {
    for (let i = 0; i < pokemonsDoTipo.length; i++) {
      pokemons[i] = pokemonsDoTipo[i].data;
    }
  
    setPokemons(pokemons);
  })
}