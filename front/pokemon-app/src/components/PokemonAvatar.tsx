import React from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "./ui/avatar"
import { getFallbackFromName } from '../utils';

interface PokemonAvatarProps {
  name: string;
  imageUrl: string;
}

const PokemonAvatar: React.FC<PokemonAvatarProps> = ({ name, imageUrl }) => {

  return (
    <>
      <div className="rounded-full bg-gray-200 w-28 h-28">
        <Avatar className="rounded-full w-28 h-28 flex justify-center items-center" >
            <AvatarImage src={imageUrl} alt={name} className="size-32" />
            <AvatarFallback>{getFallbackFromName(name)}</AvatarFallback>
        </Avatar>         
      </div>     
    </>
    
  );
};

export default PokemonAvatar;
