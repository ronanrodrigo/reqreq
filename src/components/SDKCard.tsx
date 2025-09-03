'use client';

import { useState, useEffect } from 'react';
import { SDK } from '@/types/sdk';

interface SDKCardProps {
  sdk: SDK;
}

export default function SDKCard({ sdk }: SDKCardProps) {
  const [showAllVersions, setShowAllVersions] = useState(false);
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowAllVersions(false);
      }
    };

    if (showAllVersions) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showAllVersions]);
  
  // Function to get current platform requirements for a version
  const getCurrentRequirements = (versionIndex: number) => {
    if (!sdk.versions || !sdk.versions[versionIndex]) {
      return [];
    }
    
    // If this version has requirements, use them
    if (sdk.versions[versionIndex].platformVersions) {
      return sdk.versions[versionIndex].platformVersions;
    }
    
    // Otherwise, find the most recent version with requirements
    for (let i = versionIndex - 1; i >= 0; i--) {
      if (sdk.versions[i] && sdk.versions[i].platformVersions) {
        return sdk.versions[i].platformVersions;
      }
    }
    
    return [];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{sdk.name}</h3>
        <div className="flex flex-wrap gap-1">
          {(sdk.tags || []).map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <strong>Language:</strong> {sdk.language}
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-medium text-gray-900">Recent Versions</h4>
        {(sdk.versions || []).slice(0, 5).map((version, index) => {
          if (!version) return null;
          const hasRequirements = version.platformVersions && version.platformVersions.length > 0;
          
          return (
            <div key={index} className={`border rounded-md p-2 ${hasRequirements ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 text-sm">v{version.version}</span>
                <span className="text-xs text-gray-500">
                  {new Date(version.releaseDate).toLocaleDateString()}
                </span>
              </div>
              
              {hasRequirements && (
                <div className="mt-2">
                  <div className="text-xs text-blue-600 font-medium mb-1">New requirements:</div>
                  <div className="flex flex-wrap gap-1">
                    {version.platformVersions.map((platform, platformIndex) => (
                      <div
                        key={platformIndex}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          platform.platform === 'iOS'
                            ? 'bg-gray-900 text-white'
                            : 'bg-green-500 text-white'
                        }`}
                      >
                        {platform.platform} {platform.version}+
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {(sdk.versions || []).length > 5 && (
          <div className="text-xs text-gray-500 text-center py-1">
            ... and {(sdk.versions || []).length - 5} more versions
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => setShowAllVersions(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          View All {(sdk.versions || []).length} Versions
        </button>
      </div>

      {/* Modal for all versions */}
      {showAllVersions && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAllVersions(false);
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{sdk.name}</h2>
                  <p className="text-sm text-gray-600">
                    All {(sdk.versions || []).length} versions • {(sdk.versions || []).filter(v => v && v.platformVersions).length} requirement changes
                  </p>
                </div>
                <button
                  onClick={() => setShowAllVersions(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">iOS Requirement</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Android Requirement</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(sdk.versions || []).map((version, index) => {
                    if (!version) return null;
                    const hasRequirements = version.platformVersions && version.platformVersions.length > 0;
                    const currentRequirements = getCurrentRequirements(index);
                    const iosReq = currentRequirements.find(p => p && p.platform === 'iOS');
                    const androidReq = currentRequirements.find(p => p && p.platform === 'Android');
                    
                    return (
                      <tr key={index} className={hasRequirements ? 'bg-blue-50' : ''}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                          v{version.version}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {new Date(version.releaseDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {iosReq ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-900 text-white">
                              iOS {iosReq.version}+
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {androidReq ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                              Android {androidReq.version}+
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {hasRequirements ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Requirements changed
                            </span>
                          ) : (
                            <span className="text-gray-500">Same as previous</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
