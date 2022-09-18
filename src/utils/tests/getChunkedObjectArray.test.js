import { describe, test, expect } from 'vitest';
import getChunkedObjectArray from '../getChunkedObjectArray';

const mockIdList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe('getChunkedObjectArray test', () => {
  test('Result should be array given valid input', () => {
    const result = getChunkedObjectArray(mockIdList, 2);
    expect(Array.isArray(result)).toBe(true);
  });
  test('Result should be array with length of 5', () => {
    const result = getChunkedObjectArray(mockIdList, 2);
    expect(result.length).toBe(5);
  });
  test('Function should thorw error on invalid input', () => {
    expect(() => {
      getChunkedObjectArray(null);
    }).toThrow('Collection is not an array');
  });
});
