import { useState, useEffect, useMemo } from 'react';
import { SDK } from '../../domain/entities/SDK';
import { GetAllSDKsUseCase } from '../../application/use-cases/GetAllSDKsUseCase';
import { GetFilteredSDKsUseCase } from '../../application/use-cases/GetFilteredSDKsUseCase';
import { GetFilterOptionsUseCase } from '../../application/use-cases/GetFilterOptionsUseCase';
import { JSONSDKRepository } from '../../infrastructure/repositories/JSONSDKRepository';
import { SDKFilterService } from '../../domain/services/SDKFilterService';

interface UseSDKsResult {
  sdks: SDK[];
  filteredSdks: SDK[];
  tags: string[];
  languages: string[];
  loading: boolean;
  error: string | null;
  filterSDKs: (criteria: { tag?: string; language?: string; searchTerm?: string }) => void;
}

export function useSDKs(): UseSDKsResult {
  const [sdks, setSdks] = useState<SDK[]>([]);
  const [filteredSdks, setFilteredSdks] = useState<SDK[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize use cases with useMemo to prevent recreation
  const { getAllSDKsUseCase, getFilteredSDKsUseCase, getFilterOptionsUseCase } = useMemo(() => {
    const repository = new JSONSDKRepository();
    const filterService = new SDKFilterService();
    
    return {
      getAllSDKsUseCase: new GetAllSDKsUseCase(repository),
      getFilteredSDKsUseCase: new GetFilteredSDKsUseCase(repository, filterService),
      getFilterOptionsUseCase: new GetFilterOptionsUseCase(repository, filterService)
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load all SDKs
        const allSDKs = await getAllSDKsUseCase.execute();
        setSdks(allSDKs);
        setFilteredSdks(allSDKs);

        // Load filter options
        const filterOptions = await getFilterOptionsUseCase.execute();
        setTags(filterOptions.tags);
        setLanguages(filterOptions.languages);
        
      } catch (err) {
        console.error('Error loading SDK data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [getAllSDKsUseCase, getFilterOptionsUseCase]);

  const filterSDKs = async (criteria: { tag?: string; language?: string; searchTerm?: string }) => {
    try {
      const filtered = await getFilteredSDKsUseCase.execute(criteria);
      setFilteredSdks(filtered);
    } catch (err) {
      console.error('Error filtering SDKs:', err);
    }
  };

  return {
    sdks,
    filteredSdks,
    tags,
    languages,
    loading,
    error,
    filterSDKs
  };
}
