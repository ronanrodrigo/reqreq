'use client';

import { useState, useEffect } from 'react';
import SDKCard from '@/components/SDKCard';
import FilterBar from '@/components/FilterBar';
import { SDKData } from '@/types/sdk';

export default function Home() {
  const [sdks, setSdks] = useState<SDKData>([]);
  const [filteredSdks, setFilteredSdks] = useState<SDKData>([]);
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSdks = async () => {
      try {
        // For GitHub Pages deployment, we need to check if we're in production
        // and use the correct base path. On GitHub Pages, the site is served from
        // https://ronanrodrigo.github.io/reqreq/
        const isGitHubPages = typeof window !== 'undefined' && 
          (window.location.hostname === 'ronanrodrigo.github.io' || 
           process.env.NODE_ENV === 'production');
        
        const basePath = isGitHubPages ? '/reqreq' : '';
        const url = `${basePath}/sdks.json`;
        
        console.log('Fetching from URL:', url);
        console.log('Is GitHub Pages:', isGitHubPages);
        console.log('Current hostname:', typeof window !== 'undefined' ? window.location.hostname : 'server');
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch SDK data from ${url}: ${response.status} ${response.statusText}`);
        }
        const data: SDKData = await response.json();
        
        console.log('Fetched data:', data ? `${data.length} SDKs` : 'No data');
        
        // Ensure data is valid array and each SDK has required properties
        const validData = Array.isArray(data) ? data.filter(sdk => 
          sdk && sdk.name && sdk.tags && Array.isArray(sdk.tags) && sdk.language && sdk.versions
        ) : [];
        
        console.log('Valid data:', `${validData.length} SDKs after validation`);
        
        setSdks(validData);
        setFilteredSdks(validData);
      } catch (err) {
        console.error('Error fetching SDK data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSdks();
  }, []);

  useEffect(() => {
    let filtered = sdks || [];

    if (selectedTag !== 'All') {
      filtered = filtered.filter(sdk => sdk.tags && sdk.tags.includes(selectedTag));
    }

    if (selectedLanguage !== 'All') {
      filtered = filtered.filter(sdk => sdk.language === selectedLanguage);
    }

    if (searchTerm) {
      filtered = filtered.filter(sdk => 
        sdk.name && sdk.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSdks(filtered);
  }, [sdks, selectedTag, selectedLanguage, searchTerm]);

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
          sdks={sdks}
          selectedTag={selectedTag}
          selectedLanguage={selectedLanguage}
          searchTerm={searchTerm}
          onTagChange={setSelectedTag}
          onLanguageChange={setSelectedLanguage}
          onSearchChange={setSearchTerm}
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
              <SDKCard key={index} sdk={sdk} />
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
