<template>
  <h2>{{ customTitle }}</h2>
  <p data-testid="counter">{{ counter }} <sup>2</sup>= {{ squareCounter }}</p>

  <div class="buttons-container">
    <button data-testid="increaseButton" @click="increase">+1</button>
    <button data-testid="decreaseButton" @click="decrease">-1</button>
  </div>
</template>

<script>
export default {
  //   props: ['title']
  props: {
    title: String,
    start: {
      type: Number,
      default: 100,
      validator: (value) => {
        return value >= 0
      },
    },
  },

  data() {
    return {
      counter: this.start,
    }
  },

  methods: {
    getSquareValue() {
      return this.counter * this.counter
    },

    increase() {
      this.counter++
    },

    decrease() {
      this.counter--
    },
  },

  computed: {
    squareCounter() {
      return this.counter * this.counter
    },

    customTitle() {
      return this.title || 'Counter'
    },
  },
}
</script>

<style>
button {
  background-color: #64bb87;
  border-radius: 5px;
  border: 1px solid white;
  color: white;
  margin: 10px;
  padding: 5px 15px;
  transition: 0.3s ease-in-out;
}

button:hover {
  background-color: #4caf50;
  transition: 0.3s ease-in-out;
}
</style>
