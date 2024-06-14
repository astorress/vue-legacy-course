import Counter from '@/components/Counter.vue'
import { shallowMount } from '@vue/test-utils'

describe('Counter Component', () => {
  //   test('Debe de hacer match con el snapshot', () => {
  //     // ARRANGE

  //     // ACT
  //     const wrapper = shallowMount(Counter)

  //     // ASSERT
  //     expect(wrapper.html()).toMatchSnapshot()
  //   })

  test('h2 debe tener el valor por defecto "Counter"', () => {
    // ARRANGE
    const wrapper = shallowMount(Counter)

    // ACT
    const h2Value = wrapper.find('h2')

    // ASSERT
    expect(wrapper.find('h2').exists()).toBe(true)
    expect(h2Value.text()).toBe('Counter')
  })

  test('El valor por defecto debe ser 100 en el p', () => {
    // ARRANGE
    const wrapper = shallowMount(Counter)

    // ACT
    // const pTags = wrapper.findAll('p')
    const value = wrapper.find('[data-testid="counter"]')

    // ASSERT
    expect(value.text().split(' ')[0]).toBe('100')
  })

  test('Debe incrementar en 1 el valor del contador', async () => {
    // ARRANGE
    const wrapper = shallowMount(Counter)

    // ACT
    // const increaseBtn = wrapper.findAll('button')
    const increaseBtn = wrapper.find('[data-testid="increaseButton"]')

    await increaseBtn.trigger('click')

    const value = wrapper.find('[data-testid="counter"]')

    // EXPECT
    expect(value.text().split(' ')[0]).toBe('101')
  })

  test('Debe decrementar en 1 el valor del contador', async () => {
    // ARRANGE
    const wrapper = shallowMount(Counter)

    // ACT
    // const decreaseBtn = wrapper.findAll('button')
    const decreaseBtn = wrapper.find('[data-testid="decreaseButton"]')

    await decreaseBtn.trigger('click')

    const value = wrapper.find('[data-testid="counter"]')

    // EXPECT
    expect(value.text().split(' ')[0]).toBe('99')
  })

  test('Debe establecer el valor por defecto', () => {
    // ARRANGE
    const wrapper = shallowMount(Counter)

    // ACT
    const { start } = wrapper.props()
    const value = wrapper.find('[data-testid="counter"]')

    // EXPECT
    expect(Number(value.text().split(' ')[0])).toBe(start)
  })

  test('Debe mostrar la prop title', () => {
    // ARRANGE
    const title = 'Hola Mundo'
    const wrapper = shallowMount(Counter, {
      props: {
        title,
      },
    })

    // ACT
    const h2 = wrapper.find('h2')

    // EXPECT
    expect(h2.text()).toBe('Hola Mundo')
  })
})
