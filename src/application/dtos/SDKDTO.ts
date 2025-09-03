export interface SDKVersionDTO {
  version: string;
  releaseDate: string;
  platformVersions?: Array<{
    platform: 'iOS' | 'Android';
    version: string;
  }>;
}

export interface SDKDTO {
  name: string;
  tags: string[];
  language: string;
  versions: SDKVersionDTO[];
}

export interface FilterCriteriaDTO {
  tag?: string;
  language?: string;
  searchTerm?: string;
}
