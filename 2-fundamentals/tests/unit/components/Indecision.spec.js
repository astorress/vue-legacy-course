import { shallowMount } from '@vue/test-utils'
import Indecision from '@/components/Indecision.vue'

describe('Indecision Component', () => {
  let wrapper
  let consoleLogSpy

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: 'yes',
          forced: false,
          image: 'https://yesno.wtf/assets/yes/2.gif',
        }),
    })
  )

  beforeEach(() => {
    wrapper = shallowMount(Indecision)
    consoleLogSpy = jest.spyOn(console, 'log')
    jest.clearAllMocks()
  })

  test('Debe de hacer match con el snapshot', () => {
    // ARRANGE
    // ACT

    // ASSERT
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('Escribir en el input no debe disparar nada (console.log)', async () => {
    // ARRANGE
    // const input = wrapper.find('input')
    const input = wrapper.find('[data-testid="inputQuestion"]')

    const getAnswerApiSpy = jest.spyOn(wrapper.vm, 'getAnswerApi')

    // ACT
    await input.setValue('Hola Mundo')

    // ASSERT
    expect(consoleLogSpy).toHaveBeenCalledTimes(1)
    expect(getAnswerApiSpy).not.toHaveBeenCalled()
  })

  test('Escribir el simbolo de "?" debe de disparar el fetch', async () => {
    // ARRANGE
    // const input = wrapper.find('input')
    const input = wrapper.find('[data-testid="inputQuestion"]')

    const getAnswerApiSpy = jest.spyOn(wrapper.vm, 'getAnswerApi')

    // ACT
    await input.setValue('Hola Mundo?')

    // ASSERT
    expect(consoleLogSpy).toHaveBeenCalledTimes(1)
    expect(getAnswerApiSpy).toHaveBeenCalledTimes(1)
  })

  test('Prueba en getAnswer', async () => {
    // ARRANGE

    // ACT
    await wrapper.vm.getAnswerApi()
    const img = wrapper.find('img')

    // ASSERT
    expect(img.exists()).toBeTruthy()
    expect(wrapper.vm.answer).toBe('Si!')
    expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif')
  })

  test('Prueba en getAnswer - Fallo en el API', async () => {
    // ARRANGE
    fetch.mockImplementationOnce(() => Promise.reject('API is down'))

    // ACT
    await wrapper.vm.getAnswerApi()
    const img = wrapper.find('img')

    // ASSERT
    expect(img.exists()).toBeFalsy()
    expect(wrapper.vm.answer).toBe('No se pudo cargar el API')
    expect(wrapper.vm.img).toBe(null)
  })
})
