import { describe, expect, it } from 'vitest';
import { parsePortsData } from './ports-data';

describe('parsePortsData', () => {
  it('returns valid port data unchanged', () => {
    const data = [
      {
        slug: 'tmux',
        packageName: '@sageveil/tmux',
        displayName: 'tmux',
        description: 'desc',
        version: '0.2.1',
        tags: ['terminal'],
      },
    ];

    expect(parsePortsData(data)).toEqual(data);
  });

  it('throws for invalid item shapes', () => {
    expect(() =>
      parsePortsData([
        {
          slug: 'tmux',
          packageName: '@sageveil/tmux',
          displayName: 'tmux',
          description: 'desc',
          version: '0.2.1',
          tags: [123],
        },
      ])
    ).toThrowError('Invalid ports data at index 0.');
  });

  it('throws when data is not an array', () => {
    expect(() => parsePortsData({})).toThrowError(
      'Invalid ports data: expected an array.'
    );
  });
});
