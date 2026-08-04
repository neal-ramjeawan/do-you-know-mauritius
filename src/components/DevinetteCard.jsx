import { useState } from "react";


export default function DevinetteCard({
  question,
  number,
  total,
  onAnswer,
}) {

  const [showHint, setShowHint] = useState(false);
  const [selected, setSelected] = useState(null);


  function chooseAnswer(option) {

    if (selected) return;

    setSelected(option);


    setTimeout(() => {
      onAnswer(option.correct);
    }, 1500);

  }



  return (

    <div className="rounded-2xl border border-shell-300/10 bg-depths-800/60 p-6">


      <p className="text-sm text-shell-300/60">
        🇲🇺 Devinette {number}/{total}
      </p>


      <h2 className="mt-5 text-xl text-shell-100">
        {question.question}
      </h2>



      {!showHint && (

        <button
          onClick={() => setShowHint(true)}
          className="mt-6 rounded-full border px-5 py-2"
        >
          💡 Voir l'indice
        </button>

      )}



      {showHint && (

        <p className="mt-5 text-shell-300">
          💡 {question.hint}
        </p>

      )}




      <div className="mt-6 space-y-3">

        {question.options.map((option, index) => (

          <button

            key={index}

            disabled={selected !== null}

            onClick={() => chooseAnswer(option)}

            className={`w-full rounded-xl border p-4 text-left transition-colors
              ${
                selected === option
                  ? option.correct
                    ? "border-green-500 bg-green-500/10"
                    : "border-red-500 bg-red-500/10"
                  : "border-shell-300/20 hover:border-turmeric-500"
              }
            `}
          >

            {String.fromCharCode(65 + index)}. {option.text}

          </button>

        ))}

      </div>



      {selected && (

        <div className="mt-5">

          {selected.correct ? (

            <p className="text-green-400">
              🎉 Correct !
            </p>

          ) : (

            <p className="text-red-400">
              ❌ La bonne réponse était :
              {" "}
              {
                question.options.find(
                  (option) => option.correct
                ).text
              }
            </p>

          )}

        </div>

      )}


    </div>

  );
}