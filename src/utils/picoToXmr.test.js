import picoToXmr  from './picoToXmr';

test('picoToXmr', () => {
  expect(picoToXmr(1000000000000n)).toEqual('1.000000000000')
  expect(picoToXmr(0n)).toEqual('0.000000000000')
})
