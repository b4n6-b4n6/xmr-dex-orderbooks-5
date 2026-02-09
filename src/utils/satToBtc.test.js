import satToBtc  from './satToBtc';

test('btcToSat', () => {
  expect(satToBtc(0n)).toEqual('0.00000000')
  expect(satToBtc(4444n)).toEqual('0.00004444')
  expect(satToBtc(100000000n)).toEqual('1.00000000')
  expect(satToBtc(12300000000n)).toEqual('123.00000000')
  expect(satToBtc(12312345678n)).toEqual('123.12345678')
})
