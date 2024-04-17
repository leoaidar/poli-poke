import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchIconClick = () => {
    handleSearch();
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className="relative flex items-center w-96">
      <div className="absolute ml-2" onClick={handleSearchIconClick}>
        <Search className="text-gray-400 cursor-pointer" size={20} />
      </div>        
        <Input
            type="text"
            placeholder="Buscar Pokemon..."
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="pl-10 pr-3 py-2 "
        />
    </div>
  );
};

export default SearchBar;
