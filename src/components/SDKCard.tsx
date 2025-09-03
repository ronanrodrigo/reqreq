'use client';

import { SDK } from '@/types/sdk';

interface SDKCardProps {
  sdk: SDK;
}

export default function SDKCard({ sdk }: SDKCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{sdk.name}</h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {sdk.type}
        </span>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <strong>Language:</strong> {sdk.language}
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="text-lg font-medium text-gray-900">Versions</h4>
        {sdk.versions.map((version, index) => (
          <div key={index} className="border rounded-lg p-3 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">v{version.version}</span>
              <span className="text-sm text-gray-500">
                {new Date(version.releaseDate).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {version.platformVersions.map((platform, platformIndex) => (
                <div
                  key={platformIndex}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
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
        ))}
      </div>
    </div>
  );
}
