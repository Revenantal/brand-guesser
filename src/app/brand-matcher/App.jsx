'use client';
import React, { useState } from 'react';
import {useSortable} from '@dnd-kit/react/sortable';
import { DragDropProvider } from '@dnd-kit/react';
import { FaCheck, FaX, FaQuestion } from "react-icons/fa6";

function Sortable({id, index, value, disabled}) {
  const {ref} = useSortable({id, index, value, disabled});

  return (
    <div ref={ref} className="bg-slate-900 h-40 rounded-md font-bold text-xl p-5 place-content-center hover:bg-slate-800 cursor-grab transition-all">
      {value}
    </div>
  );
}

function GuessResult({attempt}) {

  if (!attempt) {
    return (
      <FaQuestion className="mx-auto fa-fw text-3xl"/>  
    )
  } 

  if (attempt.hasWon) {
    return (
      <FaCheck className="mx-auto fa-fw text-3xl fill-green-600"/>
    )
  } 

  return (
    <FaX className="mx-auto fa-fw text-3xl fill-red-600"/>
  )
}

export const GameState = {
  pending: "pending",
  active: "active",
  results: "results",
  loading: "loading",
}

export const GameResult = {
  won: "won",
  lost: "lost",
}


export default function BrandMatcher() {


  const [game, setGame] = useState(
    {
      state: GameState.pending,
      result: null,
      maxAttempts: 3,
      attempts: [],
  });

  const [brands, setBrands] = useState([]);
  const [guesses, setGuesses] = useState([])
  
  function onDragEnd(event) {
    setGuesses((guesses) => swapElements(guesses, event.operation.target.sortable.initialIndex, event.operation.target.sortable.previousIndex));
  }

  function handleSubmitGuess() {
    let guessResults = [...guesses];
    let totalCorrect = 0;
    guessResults.forEach((guess, index)=> {
      if (guess.id == brands[index].id) {
        totalCorrect++;
        guess.isCorrect = true;
      } else {
        guess.isCorrect = false;
      }
    });
    setGuesses(guessResults);


    let gameResults = game;


    let attempt = {
      id: game.attempts.length,
      totalCorrect: totalCorrect,
      hasWon: totalCorrect == guesses.length
    }

    gameResults.attempts = [
      ...game.attempts, attempt
    ];



    // Lost State
    if (gameResults.attempts.length >= gameResults.maxAttempts) {
      gameResults.result = GameResult.lost;
      gameResults.state = GameState.results;
    }

    // Win State
    if (attempt.hasWon == true) {
      gameResults.result = GameResult.won;
      gameResults.state = GameState.results;
    }

    setGame(gameResults);
  }

  function handleStartGame() {
    let gameDefault = {
      state: GameState.active,
      result: null,
      maxAttempts: 3,
      attempts: [],
    }

    let guesses = [
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
    ];

    let brands = [
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
  ];

    setGame(gameDefault);
    setGuesses(guesses);
    setBrands(brands);
  }

  return (
    <>

  {game.state == GameState.pending  ?
    <div>
      <h1 className="text-4xl font-bold mb-5">Brand Matcher!</h1>
      <div className="text-2xl max-w-prose">
        <div className="mb-5">Welcome to Brand Guesser!</div>
        <div className="mb-10">You will be given 3 attempts to match the brand colour to the brand name. All brand colours and names are generated at random with ChatGPT!</div>
      </div>
      <button
        className={"bg-indigo-500 p-2 px-5 rounded-md hover:bg-indigo-700 transition-colors text-2xl"}
        value="Submit"
        onClick={(e) => {
            handleStartGame();
        }}
      >Start a New Game</button>
    </div>

  : ''}

    {game.state == GameState.active || game.state == GameState.results ?
    <div>
      <h1 className="text-4xl font-bold mb-5">Match The Brands!</h1>
      <h4 className="text-l mb-5">Test your brand knowledge and try to match the brand name to the brand colour</h4>
      <div className="flex justify-center gap-5 mb-6">
        {[...Array(game.maxAttempts).keys()].map((key) => 
          <div className="w-20 h-20 bg-slate-800 rounded content-center" key={key}>
          
            <GuessResult  attempt={game.attempts[key]}/>     
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-5">
      <div className="grid grid-cols-1 gap-2">
        {brands.map((brand, index) =>
          <div className="h-40 rounded-md p-5 place-content-center text-xl" key={index} style={{ backgroundColor: `${brand.hexCode}`}}>
            {game.state == GameState.results ? brand.name : ''}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-2">
        {guesses.map((guess, index) => 
          <div key={guess.id} className='h-40 rounded-md content-center'>
            <div className="text-5xl flex bg-repeat-x bg-center bg-[length:20px_20px]" style={{backgroundImage: `radial-gradient(rgb(255 255 255 / 30%) 2px, transparent 0)`}}>{guess.isCorrect ? <FaCheck className='fill-green-500 bg-slate-950 fa-fw mx-auto' /> : <FaX className='fill-red-600 mx-auto fa-fw bg-slate-950' />}</div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-2">
        <DragDropProvider onDragEnd={onDragEnd}>
          {guesses.map((guess, index) =>
            <Sortable key={guess.id} id={guess.id} index={index} value={guess.name} disabled={game.state == GameState.active ? false : true} />
          )}
        </DragDropProvider>
      </div>
      <div className="col-span-3 mt-5">
            {game.state == GameState.active ? 
            <button
              className="bg-indigo-500 p-2 px-5 rounded-md hover:bg-indigo-700 transition-colors text-2xl "
              value="Submit"
              onClick={(e) => {
                  handleSubmitGuess();
              }}
            >Submit Guess</button>
            : ''}


            {game.result == GameResult.won ? 
              <div className="text-4xl mb-5">
                Congrats you win!
              </div>
            : ''}


            {game.result == GameResult.lost ? 
              <div className="text-4xl mb-5">
                Better luck next time!
              </div>
            : ''}
  

            <div
            className={(game.result != null ? '' : 'hidden')}>
              <button
                className={"bg-indigo-500 p-2 px-5 rounded-md hover:bg-indigo-700 transition-colors text-2xl"}
                value="Submit"
                onClick={(e) => {
                    handleStartGame();
                }}
            >Play Again!</button>
                
                
            </div>
        </div>
      </div>
    </div>
    : ''}
    </>
  )   
}
const swapElements = (arr, pos1, pos2) => {
  const temp = arr[pos1];

  arr[pos1] = arr[pos2];

  arr[pos2] = temp;

  return arr;
};