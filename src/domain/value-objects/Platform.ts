export enum Platform {
  IOS = 'iOS',
  ANDROID = 'Android'
}

export class PlatformVersion {
  constructor(
    public readonly platform: Platform,
    public readonly version: string
  ) {
    this.validateVersion(version);
  }

  private validateVersion(version: string): void {
    if (!version || version.trim().length === 0) {
      throw new Error('Platform version cannot be empty');
    }
  }

  equals(other: PlatformVersion): boolean {
    return this.platform === other.platform && this.version === other.version;
  }

  toString(): string {
    return `${this.platform} ${this.version}+`;
  }
}
