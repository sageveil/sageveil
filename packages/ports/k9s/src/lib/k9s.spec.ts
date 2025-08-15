import { k9s } from './k9s.js';

describe('k9s', () => {
  it('should work', () => {
    expect(k9s()).toEqual('k9s');
  });
});
