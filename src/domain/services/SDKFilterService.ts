import { SDK } from '../entities/SDK';

export interface FilterCriteria {
  tag?: string;
  language?: string;
  searchTerm?: string;
}

export class SDKFilterService {
  filterSDKs(sdks: SDK[], criteria: FilterCriteria): SDK[] {
    let filtered = [...sdks];

    if (criteria.tag && criteria.tag !== 'All') {
      filtered = filtered.filter(sdk => sdk.hasTag(criteria.tag!));
    }

    if (criteria.language && criteria.language !== 'All') {
      filtered = filtered.filter(sdk => sdk.hasLanguage(criteria.language!));
    }

    if (criteria.searchTerm && criteria.searchTerm.trim()) {
      filtered = filtered.filter(sdk => sdk.matchesSearchTerm(criteria.searchTerm!));
    }

    return filtered;
  }

  getAllTags(sdks: SDK[]): string[] {
    const tagSet = new Set<string>();
    sdks.forEach(sdk => {
      sdk.tags.forEach(tag => tagSet.add(tag.value));
    });
    return Array.from(tagSet).sort();
  }

  getAllLanguages(sdks: SDK[]): string[] {
    const languageSet = new Set<string>();
    sdks.forEach(sdk => {
      languageSet.add(sdk.language.value);
    });
    return Array.from(languageSet).sort();
  }
}
