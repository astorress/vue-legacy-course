describe('Example Component', () => {
  test('Debe ser mayor a 10', () => {
    // ARRANGE
    let value = 10

    // ACT
    value = value + 2

    // ASSERT
    expect(value).toBeGreaterThan(10)
  })
})
