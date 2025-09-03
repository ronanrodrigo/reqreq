export class SDKTag {
  constructor(public readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('SDK tag cannot be empty');
    }
    if (this.value.length > 50) {
      throw new Error('SDK tag cannot exceed 50 characters');
    }
  }

  equals(other: SDKTag): boolean {
    return this.value.toLowerCase() === other.value.toLowerCase();
  }

  toString(): string {
    return this.value;
  }
}

export class SDKName {
  constructor(public readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('SDK name cannot be empty');
    }
    if (this.value.length > 100) {
      throw new Error('SDK name cannot exceed 100 characters');
    }
  }

  equals(other: SDKName): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}

export class ProgrammingLanguage {
  constructor(public readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('Programming language cannot be empty');
    }
  }

  equals(other: ProgrammingLanguage): boolean {
    return this.value.toLowerCase() === other.value.toLowerCase();
  }

  toString(): string {
    return this.value;
  }
}
