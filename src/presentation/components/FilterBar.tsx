'use client';

interface FilterBarProps {
  tags: string[];
  languages: string[];
  selectedTag: string;
  selectedLanguage: string;
  searchTerm: string;
  onTagChange: (tag: string) => void;
  onLanguageChange: (language: string) => void;
  onSearchChange: (search: string) => void;
}

export default function FilterBar({
  tags,
  languages,
  selectedTag,
  selectedLanguage,
  searchTerm,
  onTagChange,
  onLanguageChange,
  onSearchChange,
}: FilterBarProps) {
  const tagOptions = ['All', ...tags];
  const languageOptions = ['All', ...languages];

  return (
    <div className="bg-card rounded-lg shadow-md p-6 mb-8 border border-border">
      <h2 className="text-lg font-semibold text-card-foreground mb-4">Filter SDKs</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-card-foreground mb-2">
            Search
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name..."
            className="w-full px-3 py-2 border border-border rounded-md shadow-sm bg-card text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="tag" className="block text-sm font-medium text-card-foreground mb-2">
            Tags
          </label>
          <select
            id="tag"
            value={selectedTag}
            onChange={(e) => onTagChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md shadow-sm bg-card text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {tagOptions.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-card-foreground mb-2">
            Language
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md shadow-sm bg-card text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {languageOptions.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
