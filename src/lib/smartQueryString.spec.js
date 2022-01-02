import { parseToQueryString, parseToObject } from './smartQueryString';

describe('QueryString', () => {
  describe('parseToQueryString', () => {
    it('should create a valid query string when an object is provided', () => {
      const obj = {
        name: 'Brendo',
        profession: 'developer',
      };

      const result = parseToQueryString(obj);

      expect(result).toEqual('name=Brendo&profession=developer');
    });
  });

  it('shoul create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Brendo',
      profession: 'developer',
      abilities: ['js', 'ts', 'tests', 'node', 'react', 'nextjs'],
    };

    const result = parseToQueryString(obj);

    expect(result).toEqual(
      'name=Brendo&profession=developer&abilities=js,ts,tests,node,react,nextjs',
    );
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Brendo',
      profession: 'developer',
      abilities: {
        first: 'JS',
        second: 'TS',
      },
    };

    expect(() => {
      parseToQueryString(obj);
    }).toThrowError();
  });

  describe('parseToObject', () => {
    it('should convert a query to object', () => {
      const string = 'name=Brendo&profession=developer';
      const result = parseToObject(string);
      expect(result).toEqual({
        name: 'Brendo',
        profession: 'developer',
      });
    });

    it('should convert a query to object without &', () => {
      const string = 'name=Brendo';
      const result = parseToObject(string);
      expect(result).toEqual({
        name: 'Brendo',
      });
    });

    it('should convert a query to object taking care of comma separated values', () => {
      const string = 'name=Brendo&profession=developer&abilities=js,ts';
      const result = parseToObject(string);
      expect(result).toEqual({
        name: 'Brendo',
        profession: 'developer',
        abilities: ['js', 'ts'],
      });
    });
  });
});
