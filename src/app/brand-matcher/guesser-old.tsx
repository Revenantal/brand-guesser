'use client';
import React, { useState } from 'react';

export default function Guesser({ placeholder} : { placeholder: string}) {


    type Brand = {
        id: number,
        name: string;
        hexCode: string;
    }

    const [guess, setGuess] = useState('');
    const [brands, setBrands] = useState(randomBrands(1));
    const [guesses, setGuesses] = useState(Array<string>);

    
    function handleSubmitGuess() {
        console.log(brands);
        setGuesses(
            [ ...guesses, guess ]
        )
       /* if (guess == answer) {
            console.log("Correct!", answer, [ ...guesses, guess ]);
        } else {
            console.log("Nope!", answer,[ ...guesses, guess ]);
        }*/
    }

    function randomBrands(amount:number):Brand[] {

        let brands = [
            {
                id: 0,
                name:'rocket',
                hexCode:'#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
            },
            {
                id: 1,
                name:'rocket2',
                hexCode:'#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
            },
            {
                id: 2,
                name:'rocket3',
                hexCode:'#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
            }
        ]

        return brands;
    }

    const renderBrandSwatches = () => {

        return brands.map(brand => {
            return <div key={brand.id} className="h-40" style={{ backgroundColor: `${brand.hexCode}` }} />;
        })
    }

 

    return (
        <div className="grid grid-cols-1 gap-5">
            <div className="grid grid-rows-subgrid grid-flow-col gap-4">
                {renderBrandSwatches()}
            </div>
            <div>
                <input 
                    className="bg-slate-700 p-3 rounded-md focus:ring-1 focus:ring-indigo-500 focus:outline-none focus:border-indigo-500 text-center"
                    value={guess}
                    onChange={e => setGuess(e.target.value)}
                    placeholder={placeholder}
                />
            </div>

            <div className="flex justify-center">
                <button
                    className="bg-indigo-500 p-2 px-5 rounded-md hover:bg-indigo-700 transition-colors"
                    value="Submit"
                    onClick={(e) => {
                        handleSubmitGuess();
                    }}
                >Submit Guess</button>
            </div>

        </div>

    )
}