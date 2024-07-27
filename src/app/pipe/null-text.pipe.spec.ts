import { NullTextPipe } from './null-text.pipe';

describe('NullTextPipe', () => {
  it('create an instance', () => {
    const pipe = new NullTextPipe();
    expect(pipe).toBeTruthy();
  });
});
