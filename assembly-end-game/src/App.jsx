import { useEffect, useState } from "react"
import { languages } from "./languages.js"
import { getFarewellText, getRandomWord } from "./utils.js"
import clsx from "clsx"

export default function App() {

  // state
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedWord, setGuessedWord] = useState([])

  // derived variable
  const numGuessesLeft = languages.length - 1;
  const wrongGuessedWord = guessedWord.filter((letter) => !currentWord.includes(letter)).length

  const isGameWon = currentWord.split("").every(letter => guessedWord.includes(letter));
  const isGameLost = wrongGuessedWord >= numGuessesLeft;
  const isGameOver = isGameLost || isGameWon

  const lastGuessedWord = guessedWord[guessedWord.length - 1];
  const isLastGuessIncorrect = lastGuessedWord && !currentWord.includes(lastGuessedWord);


  // static variable
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const statusClass = clsx("flex flex-col items-center justify-center text-white mt-10 py-1.5 px-1 min-h-20 rounded-xl min-w-1/2", {
    "bg-green-500": isGameWon,
    "bg-red-500": isGameLost,
    "bg-purple-500": isLastGuessIncorrect,
  })


  useEffect(() => {
    console.log(guessedWord)
  }, [guessedWord])

  function addGuessedWord(char) {
    setGuessedWord(prev => {
      return prev.includes(char) ? prev : [...prev, char]
    })
  }


  const renderStatus = () => {

    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <h1 className="font-bold text-xl mb-3">{getFarewellText(languages[wrongGuessedWord - 1].name)}</h1>
      )
    }

    if (!isGameOver) {
      return null;
    }

    if (isGameWon) {
      return (
        <>
          <h1 className="font-bold text-xl mb-3"> You win!</h1>
          <p>well done!</p>
        </>
      )
    }

    if (isGameLost) {
      return (
        <>
          <h1 className="font-bold text-xl mb-3">You lost!</h1>
          <p>better start learning Assembly!</p>
        </>
      )

    }
  }

  // it renders the holder for guessed words
  function renderWords() {
    const wordArray = currentWord.split('');

    return wordArray.map((char, index) => {

      const shouldRevealWords = isGameOver || guessedWord.includes(char)
      const className = clsx(" min-w-10 min-h-12.5 px-2.5 py-1.5 font-semibold text-3xl text-center bg-neutral-600 border-b-2 border-b-neutral-100",
        {
          "text-red-500": isGameOver && !guessedWord.includes(char),
          "text-white": guessedWord.includes(char)
        })
      return (
        <span
          key={index}
          className={className}
        >{shouldRevealWords ? char.toUpperCase() : ""}</span>
      )
    }
    )

  }

  const renderLang = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessedWord;

    return (
      <div
        key={lang.name}
        style={{ backgroundColor: `${lang.backgroundColor}`, color: `${lang.color}` }}
        className={clsx("relative flex items-center justify-center px-0.5 py-0.5 rounded-md",
          {
            "opacity-40": isLanguageLost
          })}
      >
        <span className="absolute opacity-100">{isLanguageLost ? "💀" : ""}</span>
        <p>{lang.name}</p>
      </div>
    )
  })


  const renderAlphabet = alphabet.split('').map((letter, index) => {
    const isGuessed = guessedWord.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)

    return (<button
      key={index}
      className={clsx("bg-amber-400 px-4 py-2.5 rounded-md text-sm font-semibold border border-white cursor-pointer transition-colors",
        {
          "bg-green-500": isCorrect,
          "bg-red-500": isWrong,
          "opacity-50": isGameOver
        })}
      disabled={isGameOver}
      aria-disabled={guessedWord.includes(letter)}
      aria-label={`letter ${letter}`}
      value={letter}
      onClick={(e) => addGuessedWord(e.target.value)}
    >{letter.toUpperCase()}</button>
    )
  })

  function newGame() {
    setCurrentWord(() => getRandomWord())
    setGuessedWord([])
  }


  return (
    <main className="p-8 flex flex-col items-center w-full">
      <header className="flex flex-col gap-5 items-center">
        <h1 className="text-2xl font-bold text-neutral-50 mt-5">Assembly: Endgame</h1>
        <p className="text-md text-neutral-500 text-center">
          Guess theword within 8 attempts to keep the programming
          world safe from Assebly!
        </p>
      </header>


      <section className={statusClass} aria-live="polite" role="status">
        {renderStatus()}
      </section>


      <section className="flex flex-wrap max-w-96 justify-center gap-1 mt-10">
        {renderLang}
      </section>
      <section className="mt-10 flex gap-0.5">
        {renderWords()}
      </section>

      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessedWord) ? `Correct! the letter ${lastGuessedWord} is in the word.` : `Wrong, ${lastGuessedWord} is not in the word`}
          You have {numGuessesLeft} attempts left
        </p>
        <p>Current word: {currentWord.split("").map(letter => guessedWord.includes(letter) ? letter : "blank").join(" ")}</p>
      </section>

      <section className="mt-10 flex flex-wrap justify-center gap-1 max-w-1/2">
        {renderAlphabet}
      </section>
      <section className="mt-10 w-full flex justify-center">
        {isGameOver &&
          <button
            className="text-2xl font-semibold bg-sky-300 hover:bg-sky-400 transition-colors cursor-pointer px-1.5 py-2.5 rounded-md w-1/2"
            onClick={() => newGame()}
          > New Game</button>}
      </section>
    </main>
  )
}