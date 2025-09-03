import { SDKName, SDKTag, ProgrammingLanguage } from '../../../domain/value-objects/SDKIdentifiers';

describe('SDKName', () => {
  describe('constructor', () => {
    it('should create a valid SDK name', () => {
      const name = new SDKName('React Native');
      expect(name.value).toBe('React Native');
    });

    it('should throw error for empty name', () => {
      expect(() => new SDKName('')).toThrow('SDK name cannot be empty');
    });

    it('should throw error for whitespace-only name', () => {
      expect(() => new SDKName('   ')).toThrow('SDK name cannot be empty');
    });
  });

  describe('equals', () => {
    it('should return true for identical names', () => {
      const name1 = new SDKName('React Native');
      const name2 = new SDKName('React Native');
      expect(name1.equals(name2)).toBe(true);
    });

    it('should return false for different names', () => {
      const name1 = new SDKName('React Native');
      const name2 = new SDKName('Flutter');
      expect(name1.equals(name2)).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return the name string', () => {
      const name = new SDKName('React Native');
      expect(name.toString()).toBe('React Native');
    });
  });
});

describe('SDKTag', () => {
  describe('constructor', () => {
    it('should create a valid SDK tag', () => {
      const tag = new SDKTag('framework');
      expect(tag.value).toBe('framework');
    });

    it('should throw error for empty tag', () => {
      expect(() => new SDKTag('')).toThrow('SDK tag cannot be empty');
    });

    it('should throw error for whitespace-only tag', () => {
      expect(() => new SDKTag('   ')).toThrow('SDK tag cannot be empty');
    });
  });

  describe('equals', () => {
    it('should return true for identical tags', () => {
      const tag1 = new SDKTag('framework');
      const tag2 = new SDKTag('framework');
      expect(tag1.equals(tag2)).toBe(true);
    });

    it('should return false for different tags', () => {
      const tag1 = new SDKTag('framework');
      const tag2 = new SDKTag('library');
      expect(tag1.equals(tag2)).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return the tag string', () => {
      const tag = new SDKTag('framework');
      expect(tag.toString()).toBe('framework');
    });
  });
});

describe('ProgrammingLanguage', () => {
  describe('constructor', () => {
    it('should create a valid programming language', () => {
      const language = new ProgrammingLanguage('TypeScript');
      expect(language.value).toBe('TypeScript');
    });

    it('should throw error for empty language', () => {
      expect(() => new ProgrammingLanguage('')).toThrow('Programming language cannot be empty');
    });

    it('should throw error for whitespace-only language', () => {
      expect(() => new ProgrammingLanguage('   ')).toThrow('Programming language cannot be empty');
    });
  });

  describe('equals', () => {
    it('should return true for identical languages', () => {
      const lang1 = new ProgrammingLanguage('TypeScript');
      const lang2 = new ProgrammingLanguage('TypeScript');
      expect(lang1.equals(lang2)).toBe(true);
    });

    it('should return false for different languages', () => {
      const lang1 = new ProgrammingLanguage('TypeScript');
      const lang2 = new ProgrammingLanguage('JavaScript');
      expect(lang1.equals(lang2)).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return the language string', () => {
      const language = new ProgrammingLanguage('TypeScript');
      expect(language.toString()).toBe('TypeScript');
    });
  });
});
