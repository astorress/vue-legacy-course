<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>

  <div v-else>
    <h1>¿Quién es este pokemon?</h1>

    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOption :pokemons="pokemonArr" @selectionPokemon="checkAnswer($event)" />

    <template v-if="showAnswer">
      <h2 class="fade-in">
        {{ message }}
      </h2>
      <button @click="newGame">Nuevo Juego</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture.vue' // Se importa el componente PokemonPicture donde se muestra la imagen del pokemon
import PokemonOption from '@/components/PokemonOption.vue' // Se importa el componente PokemonOption donde se muestran las opciones de los pokemones
import getPokemonOptions from '../helpers/getPokemonOptions.js' // Se importa la función getPokemonOptions que se encarga de obtener las opciones de los pokemones en el api

export default {
  components: {
    PokemonPicture,
    PokemonOption,
  },

  // Se inicializan las variables de los componentes
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: '',
    }
  },

  // Se crean los métodos necesarios para los componentes
  methods: {
    // Se crea la funcion mixPokemonArray que se encarga de obtener las opciones de los pokemones y seleccionar uno aleatoriamente
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions()

      const rndInt = Math.floor(Math.random() * 4)
      this.pokemon = this.pokemonArr[rndInt]
    },

    // Se crea la función checkAnswer que se encarga de verificar si la opción seleccionada es la correcta
    checkAnswer(selectId) {
      this.showPokemon = true
      this.showAnswer = true

      if (selectId === this.pokemon.id) {
        this.message = `Correcto!, ${this.pokemon.name}!`
      } else {
        this.message = `Opps!, era ${this.pokemon.name}`
      }
    },

    // Se crea la función newGame que se encarga de reiniciar el juego
    newGame() {
      this.showPokemon = false
      this.showAnswer = false
      this.pokemonArr = []
      this.pokemon = null
      this.mixPokemonArray()
    },
  },

  // Esto sirve para que se ejecute la función mixPokemonArray() cuando el componente se monte
  mounted() {
    this.mixPokemonArray()
  },
}
</script>
