import { vi } from 'vitest';
import { devLog } from '../utils/devLog';

describe('devLog', () => {
  it('logs to console in dev environments', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    devLog('hello', 123);
    expect(spy).toHaveBeenCalledWith('hello', 123);
    spy.mockRestore();
  });
});
