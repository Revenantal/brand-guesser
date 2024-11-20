'use client';
import React, { useState } from 'react';
import {useSortable} from '@dnd-kit/react/sortable';
import { DragDropProvider } from '@dnd-kit/react';
import {move} from '@dnd-kit/helpers'

function Sortable({id, index, value}) {
  const {ref} = useSortable({id, index, value});

  return (
    <div ref={ref} className="bg-slate-900 h-40 rounded-md font-bold text-xl p-5 place-content-center hover:bg-slate-800 cursor-grab transition-all">
      {value}
    </div>
  );
}


export default function BrandMatcher() {

  const [brands, setBrands] = useState([
      {
          id: 0,
          name:'Another Company',
          hexCode:'#004269'
      },
      {
          id: 1,
          name:'Walmart',
          hexCode:'#0075d7'
      },
      {
          id: 2,
          name:'FaceBook',
          hexCode:'#006df9'
      }
  ]);

  const [guesses, setGuesses] = useState([
    {
      id: 0,
      name:'Another Company',
      isCorrect: false,
    },
    {
      id: 1,
      name:'Walmart',
      isCorrect: false,
    },
    {
      id: 2,
      name:'FaceBook',
      isCorrect: false,
    
    }
  ])

  function onDragEnd(event) {
    setGuesses((guesses) => swapElements(guesses, event.operation.target.sortable.initialIndex, event.operation.target.sortable.previousIndex));
  }

  function handleSubmitGuess() {
    let guessResults = [...guesses];
    guessResults.forEach((guess, index)=> {
      console.log(guess.id, brands[index].id)
      if (guess.id == brands[index].id) {
        guess.isCorrect = true;
      } else {
        guess.isCorrect = false;
      }
    });

    setGuesses(guessResults);

    console.table(guessResults)

    //console.log(brands, guesses)
  }


  return (
      <div className="grid grid-cols-3 gap-5">
          <div className="grid grid-cols-1 gap-2">
            {brands.map((brand, index) =>
              <div className="h-40 rounded-md" key={index} style={{ backgroundColor: `${brand.hexCode}`}}></div>
            )}
          </div>
          <div className="grid grid-cols-1 gap-2">
            {guesses.map((guess, index) => 
              <div key={guess.id} className={`h-40 rounded-md ${guess.isCorrect ? 'bg-green-600' : 'bg-red-500'}`}></div>
            )}
          </div>
          <div className="grid grid-cols-1 gap-2">
            <DragDropProvider onDragEnd={onDragEnd}>
              {guesses.map((guess, index) =>
                <Sortable key={guess.id} id={guess.id} index={index} value={guess.name} />
              )}
            </DragDropProvider>
          </div>
          <div className="col-span-3 mt-5">
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
const swapElements = (arr, pos1, pos2) => {
  const temp = arr[pos1];

  arr[pos1] = arr[pos2];

  arr[pos2] = temp;

  return arr;
};