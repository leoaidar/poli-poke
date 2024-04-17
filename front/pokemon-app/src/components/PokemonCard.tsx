import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "./ui/avatar"

interface PokemonCardProps {
  name: string;
  imageUrl: string;
  email?: string; // Adicionado campo de e-mail opcional para exemplo
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, imageUrl, email }) => {
  return (
    <>
      <div className="rounded-full bg-gray-200 w-20 h-20">
        <Avatar className="rounded-full w-20 h-20" >
            <AvatarImage src={"gg"} alt={name} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>         
      </div>     
      <div className="flex flex-col">
        <p className="text-lg font-semibold">{name}</p>
        {email && <p className="text-sm text-gray-500">{email}</p>}
      </div>         
    </>
    
  );
};

export default PokemonCard;
