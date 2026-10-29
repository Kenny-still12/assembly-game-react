import { useEffect, useState } from "react"
import { languages } from "./languages.js"
import clsx from "clsx"

export default function App() {
  // hardcord for now
  // state
  const [currentWord, setCurrentWord] = useState("react")
  const [guessedWord, setGuessedWord] = useState([])

  // derived variable
  const wrongGuessedWord = guessedWord.filter((letter) => !currentWord.includes(letter)).length
  console.log(wrongGuessedWord)

  // static variable
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  useEffect(() => {
    console.log(guessedWord)
  }, [guessedWord])

  function addGuessedWord(char) {
    setGuessedWord(prev => {
      return prev.includes(char) ? prev : [...prev, char]
    })
  }


  // it renders the holder for guessed words
  function renderWords() {
    const wordArray = currentWord.split('');

    return wordArray.map((char, index) =>
    (
      <span
        key={index}
        className=" min-w-10 min-h-12.5 px-2.5 py-1.5 font-semibold text-3xl text-white bg-neutral-600 border-b-2 border-b-neutral-100"
      >{guessedWord.includes(char) ? char.toUpperCase() : ""}</span>
    )
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
          "bg-red-500": isWrong
        })}
      value={letter}
      onClick={(e) => addGuessedWord(e.target.value)}
    >{letter.toUpperCase()}</button>
    )
  })

  return (
    <main className="p-8 flex flex-col items-center w-full">
      <header className="flex flex-col gap-5 items-center">
        <h1 className="text-2xl font-bold text-neutral-50 mt-5">Assembly: Endgame</h1>
        <p className="text-md text-neutral-500 text-center">
          Guess theword within 8 attempts to keep the programming
          world safe from Assebly!
        </p>
      </header>
      <section className="flex flex-col items-center text-white mt-10 bg-green-500 py-1.5 px-1  rounded-xl min-w-1/2">
        {/* hardcorded for now */}
        <h2 className="font-bold text-xl mb-3">You Win!</h2>
        <p>Well Done!</p>
      </section>
      <section className="flex flex-wrap max-w-96 justify-center gap-1 mt-10">
        {renderLang}
      </section>
      <section className="mt-10 flex gap-0.5">
        {renderWords()}
      </section>
      <section className="mt-10 flex flex-wrap justify-center gap-1 max-w-1/2">
        {renderAlphabet}
      </section>
      <section className="mt-10 w-full flex justify-center">
        <button className="text-2xl bg-sky-300 hover:bg-sky-400 transition-colors cursor-pointer px-1.5 py-2.5 rounded-md w-1/2"> New Game</button>
      </section>
    </main>
  )
}