import btcToSat  from './btcToSat';

test('btcToSat', () => {
  expect(btcToSat('0.00000000')).toEqual(0n)
  expect(btcToSat('0.00004444')).toEqual(4444n)
  expect(btcToSat('1.00000000')).toEqual(100000000n)
  expect(btcToSat('123.00000000')).toEqual(12300000000n)
  expect(btcToSat('123.12345678')).toEqual(12312345678n)
})
