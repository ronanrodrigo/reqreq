export interface PlatformVersion {
  platform: 'iOS' | 'Android';
  version: string;
}

export interface SDKVersion {
  version: string;
  releaseDate: string;
  platformVersions: PlatformVersion[];
}

export interface SDK {
  name: string;
  type: string;
  language: string;
  versions: SDKVersion[];
}

export type SDKData = SDK[];
