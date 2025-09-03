export class VersionNumber {
  constructor(public readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('Version number cannot be empty');
    }
  }

  equals(other: VersionNumber): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}

export class ReleaseDate {
  constructor(public readonly value: Date) {
    this.validate();
  }

  private validate(): void {
    if (!this.value || isNaN(this.value.getTime())) {
      throw new Error('Invalid release date');
    }
    if (this.value > new Date()) {
      throw new Error('Release date cannot be in the future');
    }
  }

  static fromString(dateString: string): ReleaseDate {
    return new ReleaseDate(new Date(dateString));
  }

  equals(other: ReleaseDate): boolean {
    return this.value.getTime() === other.value.getTime();
  }

  toString(): string {
    return this.value.toISOString().split('T')[0];
  }

  toLocaleDateString(): string {
    return this.value.toLocaleDateString();
  }
}
