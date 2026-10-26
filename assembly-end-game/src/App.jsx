import { languages } from "./languages.js"

export default function App() {

  function renderLang() {
    return languages.map((lang) => (
      <div
        key={lang.name}
        style={{ backgroundColor: `${lang.backgroundColor}`, color: `${lang.color}` }}
        className="px-0.5 py-0.5 rounded-md"
      >
        <p>{lang.name}</p>
      </div>
    ))
  }
  return (
    <main className="p-8 flex flex-col items-center w-full">
      <header className="flex flex-col gap-5 items-center">
        <h1 className="text-xl font-bold text-neutral-50 mt-5">Assembly: Endgame</h1>
        <p className="text-sm text-neutral-500 text-center">
          Guess theword within 8 attempts to keep the programming
          world safe from Assebly!
        </p>
      </header>
      <section className="flex flex-col items-center text-white mt-5 bg-green-500 py-1.5 px-1 my-5 rounded-xl min-w-1/3">
        {/* hardcorded for now */}
        <h2 className="font-bold text-xl mb-3">You Win!</h2>
        <p>Well Done!</p>
      </section>
      <section className="flex flex-wrap max-w-96 justify-center gap-1">
        {renderLang()}
      </section>
    </main>
  )
}