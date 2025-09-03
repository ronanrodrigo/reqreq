'use client';

import { useState } from 'react';
import SDKCard from '@/presentation/components/SDKCard';
import FilterBar from '@/presentation/components/FilterBar';
import { useSDKs } from '@/presentation/hooks/useSDKs';
import { serviceFactory } from '@/presentation/factories/ServiceFactory';

export default function Home() {
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const { sdks, filteredSdks, tags, languages, loading, error, filterSDKs } = useSDKs();

  // Create service instances
  const versionAnalysisService = serviceFactory.createVersionAnalysisService();
  const modalService = serviceFactory.createModalService();
  const platformDisplayService = serviceFactory.createPlatformDisplayService();

  // Filter SDKs when criteria change
  const handleFilterChange = (tag: string, language: string, search: string) => {
    setSelectedTag(tag);
    setSelectedLanguage(language);
    setSearchTerm(search);
    
    filterSDKs({
      tag: tag !== 'All' ? tag : undefined,
      language: language !== 'All' ? language : undefined,
      searchTerm: search.trim() || undefined
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading SDKs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading SDKs</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SDK Version Requirements
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the iOS and Android version requirements for popular mobile development SDKs and frameworks.
          </p>
        </div>

        <FilterBar
          tags={tags}
          languages={languages}
          selectedTag={selectedTag}
          selectedLanguage={selectedLanguage}
          searchTerm={searchTerm}
          onTagChange={(tag) => handleFilterChange(tag, selectedLanguage, searchTerm)}
          onLanguageChange={(language) => handleFilterChange(selectedTag, language, searchTerm)}
          onSearchChange={(search) => handleFilterChange(selectedTag, selectedLanguage, search)}
        />

        {filteredSdks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No SDKs Found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSdks.map((sdk, index) => (
              <SDKCard 
                key={index} 
                sdk={sdk} 
                versionAnalysisService={versionAnalysisService}
                modalService={modalService}
                platformDisplayService={platformDisplayService}
              />
            ))}
          </div>
        )}

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Found {filteredSdks.length} of {sdks.length} SDKs</p>
        </div>
      </div>
    </div>
  );
}
