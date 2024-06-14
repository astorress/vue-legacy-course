import pokemonApi from '@/api/pokemonApi'

const getPokemons = () => {
  const pokemonsArr = Array.from(Array(650))

  return pokemonsArr.map((_, index) => index + 1)
}

const getPokemonOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5)

  const pokemons = await getPokemonNames(mixedPokemons.slice(0, 4))

  return pokemons
}

const getPokemonNames = async ([pokemonOne, pokemonTwo, pokemonThree, pokemonFour] = []) => {
  const promiseArr = [
    pokemonApi.get(`/${pokemonOne}`),
    pokemonApi.get(`/${pokemonTwo}`),
    pokemonApi.get(`/${pokemonThree}`),
    pokemonApi.get(`/${pokemonFour}`),
  ]

  const resps = await Promise.all(promiseArr)

  return resps.map((resp) => ({
    name: resp.data.name,
    id: resp.data.id,
  }))
}
export default getPokemonOptions
