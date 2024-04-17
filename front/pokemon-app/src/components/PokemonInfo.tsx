import React from 'react';
import { Badge } from "../components/ui/badge"
import { capitalizeFirstLetterOfEachWord } from '../utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card"

interface PokemonInfoProps {
  name: string;
  abilities: Array<string>;
}

const PokemonInfo: React.FC<PokemonInfoProps> = ({ name, abilities }) => {
  
  return (
    <Card className="h-28 border-b-0 border-0 border-none rounded-none border-white shadow-none">
      <CardHeader className="pl-1 pb-2 pt-1">
        <CardTitle>
          <p className="text-3xl font-semibold">{capitalizeFirstLetterOfEachWord(name)}</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-1">    
      {abilities.map((ability: any) => (
        <Badge className="text-lg text-white m-1">{capitalizeFirstLetterOfEachWord(ability)}</Badge>
      ))} 
      </CardContent>
    </Card> 
  );
};

export default PokemonInfo;
