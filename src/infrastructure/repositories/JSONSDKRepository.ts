import { SDK } from '../../domain/entities/SDK';
import { SDKVersion } from '../../domain/entities/SDKVersion';
import { PlatformVersion, Platform } from '../../domain/value-objects/Platform';
import { SDKRepository } from '../../domain/repositories/SDKRepository';
import { SDKDTO } from '../../application/dtos/SDKDTO';

export class JSONSDKRepository implements SDKRepository {
  private sdks: SDK[] | null = null;

  async findAll(): Promise<SDK[]> {
    if (!this.sdks) {
      await this.loadSDKs();
    }
    return this.sdks!;
  }

  async findByTag(tag: string): Promise<SDK[]> {
    const allSDKs = await this.findAll();
    return allSDKs.filter(sdk => sdk.hasTag(tag));
  }

  async findByLanguage(language: string): Promise<SDK[]> {
    const allSDKs = await this.findAll();
    return allSDKs.filter(sdk => sdk.hasLanguage(language));
  }

  async findByName(name: string): Promise<SDK | null> {
    const allSDKs = await this.findAll();
    return allSDKs.find(sdk => sdk.name.value === name) || null;
  }

  private async loadSDKs(): Promise<void> {
    try {
      const isGitHubPages = typeof window !== 'undefined' && 
        (window.location.hostname === 'ronanrodrigo.github.io' || 
         process.env.NODE_ENV === 'production');
      
      const basePath = isGitHubPages ? '/reqreq' : '';
      const url = `${basePath}/sdks.json`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch SDK data from ${url}: ${response.status} ${response.statusText}`);
      }
      
      const data: SDKDTO[] = await response.json();
      this.sdks = this.mapToEntities(data);
    } catch (error) {
      console.error('Error loading SDKs:', error);
      throw error;
    }
  }

  private mapToEntities(dtos: SDKDTO[]): SDK[] {
    return dtos
      .filter(dto => dto && dto.name && dto.tags && Array.isArray(dto.tags) && dto.language && dto.versions)
      .map(dto => {
        const versions = dto.versions.map(versionDto => {
          const platformVersions = (versionDto.platformVersions || []).map(pv => 
            new PlatformVersion(pv.platform as Platform, pv.version)
          );
          return SDKVersion.create(versionDto.version, versionDto.releaseDate, platformVersions);
        });
        
        return SDK.create(dto.name, dto.tags, dto.language, versions);
      });
  }
}
