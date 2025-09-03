import { SDKName, SDKTag, ProgrammingLanguage } from '../value-objects/SDKIdentifiers';
import { SDKVersion } from './SDKVersion';

export class SDK {
  constructor(
    public readonly name: SDKName,
    public readonly tags: SDKTag[],
    public readonly language: ProgrammingLanguage,
    public readonly versions: SDKVersion[]
  ) {
    this.validateVersions();
  }

  private validateVersions(): void {
    if (this.versions.length === 0) {
      throw new Error('SDK must have at least one version');
    }
  }

  hasTag(tag: string): boolean {
    return this.tags.some(t => t.value.toLowerCase() === tag.toLowerCase());
  }

  hasLanguage(language: string): boolean {
    return this.language.value.toLowerCase() === language.toLowerCase();
  }

  matchesSearchTerm(searchTerm: string): boolean {
    const term = searchTerm.toLowerCase();
    return this.name.value.toLowerCase().includes(term);
  }

  getRecentVersions(count: number = 5): SDKVersion[] {
    return this.versions.slice(0, count);
  }

  getAllVersionsWithRequirements(): SDKVersion[] {
    return this.versions.filter(v => v.hasRequirements());
  }

  getAvailablePlatforms(): string[] {
    const platforms = new Set<string>();
    this.versions.forEach(version => {
      version.platformVersions.forEach(pv => {
        platforms.add(pv.platform);
      });
    });
    return Array.from(platforms).sort();
  }

  static create(
    name: string,
    tags: string[],
    language: string,
    versions: SDKVersion[]
  ): SDK {
    return new SDK(
      new SDKName(name),
      tags.map(tag => new SDKTag(tag)),
      new ProgrammingLanguage(language),
      versions
    );
  }
}
