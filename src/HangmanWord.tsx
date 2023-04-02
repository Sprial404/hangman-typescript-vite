type Props = {
    guessedLetters: string[],
    targetWord: string,
    reveal?: boolean,
    correct?: boolean,
}

export function HangmanWord({
    guessedLetters,
    targetWord,
    reveal = false,
    correct = false
}: Props) {
    return <div
        style={{
            display: "flex",
            gap: ".25em",
            fontSize: "6rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "monospace",
        }}
    >
        {targetWord.split("").map((letter, index) => (
            <span style={{ borderBottom: ".1em solid black" }} key={index}>
                <span
                    style={{
                        visibility: reveal || guessedLetters.includes(letter)
                            ? "visible"
                            : "hidden",
                        color: correct
                            ? "green"
                            : reveal && !guessedLetters.includes(letter)
                            ? "red"
                            : "black",
                    }}
                >
                    {letter}
                </span>
            </span>
        ))}
    </div>
}

