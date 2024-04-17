import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchPokemons } from '../services/pokemonService';
import PokemonAvatar from './PokemonAvatar';
import PokemonInfo from './PokemonInfo';
import SearchBar from './SearchBar';
import { Pokemon } from '../types/Pokemon';
  
const PokemonList: React.FC = () => {

    const { data: pokemons, isLoading, error } = useQuery<Pokemon[]>('pokemons', fetchPokemons);
    const [searchQuery, setSearchQuery] = useState('');  
    
    const handleSearch = (query: string) => {  
        setSearchQuery(query.toLowerCase());
    };

    const filteredPokemons = pokemons?.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery)
    );    

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Ocorreu um erro: {error instanceof Error ? error.message : 'Erro desconhecido'}</div>;
    }

    return (
    <>
        <div className="flex justify-center h-20">
            <SearchBar onSearch={handleSearch} />
        </div>    
        <div className="flex justify-center min-h-screen">
            <div className="flex w-full max-w-md bg-white-200 p-6 pt-0">  
                <div className="w-2/7 bg-white-500 p-1">
                    {filteredPokemons?.map((pokemon: any) => (        
                        <div className="w-28 h-28 my-10 bg-white-500">
                            <PokemonAvatar name={pokemon.name} imageUrl={pokemon.sprite} />
                        </div>
                    ))}
                </div>                
                <div className="w-5/7 bg-white-500">      
                    {filteredPokemons?.map((pokemon: any) => (        
                        <div className="h-28 my-10">                        
                            <PokemonInfo name={pokemon.name} abilities={pokemon.abilities}  />  
                        </div>                              
                    ))} 
                </div>
            </div>
        </div>
    </>
    );
};

export default PokemonList;