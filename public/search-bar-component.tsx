import React, { useState, useRef } from 'react';
import { Search, Mic, Image, StopCircle } from 'lucide-react';
import { useReactMediaRecorder } from 'react-media-recorder';
import { useGemini } from '../hooks/useGemini';
import SearchResults from './SearchResults';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('text');
  const fileInputRef = useRef(null);
  const { searchGemini, loading, error, results } = useGemini();

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() || searchType !== 'text') {
      await searchGemini(query, searchType);
    }
  };

  const handleAudioSearch = () => {
    if (status === 'recording') {
      stopRecording();
      setSearchType('audio');
    } else {
      startRecording();
      setSearchType('audio');
    }
  };

  const handleImageSearch = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSearchType('image');
      const reader = new FileReader();
      reader.onloadend = () => {
        setQuery(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  React.useEffect(() => {
    if (mediaBlobUrl && searchType === 'audio') {
      setQuery(mediaBlobUrl);
    }
  }, [mediaBlobUrl, searchType]);

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-4">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchType === 'text' ? query : ''}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchType('text');
            }}
            placeholder="Posez votre question..."
            className="w-full p-3 pr-10 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
            disabled={searchType !== 'text'}
          />
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Search className="h-5 w-5 text-blue-500" />
          </button>
        </div>
        <button
          type="button"
          onClick={handleAudioSearch}
          className={`p-3 rounded-full ${status === 'recording' ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          {status === 'recording' ? <StopCircle className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
        <label className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
          <Image className="h-5 w-5" />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSearch}
            accept="image/*"
            className="hidden"
          />
        </label>
      </form>

      {searchType === 'audio' && mediaBlobUrl && (
        <audio src={mediaBlobUrl} controls className="w-full mb-4" />
      )}

      {searchType === 'image' && query && (
        <img src={query} alt="Uploaded" className="max-w-full h-auto mb-4" />
      )}

      {loading && (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Recherche en cours...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Erreur : </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {results && <SearchResults results={results} />}
    </div>
  );
};

export default SearchBar;
