import { useState, useEffect, useCallback } from "react"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"
import dictionary from "./dictionary.json"

function randomWord() {
    // Choose a random word for the player to guess.
    return dictionary[Math.floor(Math.random() * dictionary.length)]
}

function App() {
    const [targetWord, setTargetWord] = useState(randomWord)
    const [guessedLetters, setGuessedLetters] = useState<string[]>([])

    const incorrectLetters = guessedLetters.filter(
        letter => !targetWord.includes(letter)
    )

    const hasLost = incorrectLetters.length >= 6;
    const hasWon = targetWord.split("").every(
        letter => guessedLetters.includes(letter)
    )

    const addGuessedLetter = useCallback((letter: string) => {
        if (hasWon || hasLost || guessedLetters.includes(letter)) return

        setGuessedLetters(currentLetters => [...currentLetters, letter])
    }, [guessedLetters, hasLost, hasWon])

    // Normally, a custom react hook should be preferred, however it is only
    // used once inside Keyboard component.
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key

            if (!key.match(/^[a-z]$/)) return

            e.preventDefault()
            addGuessedLetter(key)
        }

        document.addEventListener("keypress", handler)

        return () => {
            document.removeEventListener("keypress", handler)
        }
    }, [guessedLetters])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key

            if (key !== "Enter" ) return

            e.preventDefault()
            setGuessedLetters([])
            setTargetWord(randomWord())
        }

        document.addEventListener("keypress", handler)

        return () => {
            document.removeEventListener("keypress", handler)
        }
    }, [])

    return (
        <div style={{
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            margin: "0 auto",
            alignItems: "center"
        }}>
            <div style={{ fontSize: "2rem", textAlign: "center" }}>
                {hasWon && "You are a winner! - Refresh to retry."}
                {hasLost && "Nice try - Refresh to retry."}
            </div>
            <HangmanDrawing attempts={incorrectLetters.length} />
            <HangmanWord
                guessedLetters={guessedLetters}
                targetWord={targetWord}
                reveal={hasLost}
                correct={hasWon}
            />
            <div style={{ alignSelf: "stretch" }}>
                <Keyboard
                    disabled={hasWon || hasLost}
                    activeLetters={guessedLetters.filter(letter => targetWord.includes(letter))}
                    inactiveLetters={incorrectLetters}
                    addGuessedLetter={addGuessedLetter}
                />
            </div>
        </div>
    );
}

export default App
