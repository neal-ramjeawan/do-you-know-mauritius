import { useState } from "react";
import DevinetteCard from "../components/DevinetteCard";
import { FERNEY_SPECIAL } from "../data/ferneySpecial";


function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}


function getLevel(score, total) {

  const percentage = (score / total) * 100;


  if (percentage === 100) {
    return "🦤 Légende du Dodo";
  }

  if (percentage >= 80) {
    return "🇲🇺 Expert Mauricien";
  }

  if (percentage >= 50) {
    return "🏝️ Grand connaisseur de Maurice";
  }

  return "🧳 Explorateur de Maurice";

}



export default function Devinette({ onQuit }) {


  const [questions] = useState(() =>
    shuffle(FERNEY_SPECIAL.questions)
  );


  const [index, setIndex] = useState(0);

  const [score, setScore] = useState(0);



  function handleAnswer(correct) {


    if (correct) {
      setScore((previous) => previous + 1);
    }


    setTimeout(() => {

      setIndex((previous) => previous + 1);

    }, 1500);

  }



  if (index >= questions.length) {


    return (

      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-10 text-center">


        <h1 className="font-display text-3xl text-shell-100">
          🚍 Ferney Special terminé !
        </h1>



        <p className="mt-6 text-shell-300">
          Ton score
        </p>


        <p className="mt-2 text-5xl font-bold text-turmeric-400">
          {score}/{questions.length}
        </p>



        <p className="mt-6 text-xl text-shell-100">
          {getLevel(score, questions.length)}
        </p>



        <button
          onClick={onQuit}
          className="mt-8 rounded-full bg-turmeric-500 px-6 py-3 font-semibold text-basalt"
        >
          Retour aux jeux 🇲🇺
        </button>


      </div>

    );

  }




  return (

    <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-8">


      <div className="flex justify-between items-center mb-6">


        <h1 className="font-display text-3xl text-shell-100">
          🇲🇺 Ferney Special
        </h1>


        <span className="font-mono text-shell-300/60">
          {index + 1}/{questions.length}
        </span>


      </div>



      <div className="mb-6 h-2 rounded-full bg-depths-700">

        <div
          className="h-2 rounded-full bg-turmeric-500 transition-all"
          style={{
            width: `${((index) / questions.length) * 100}%`
          }}
        />

      </div>




      <DevinetteCard

        key={index}

        question={questions[index]}

        number={index + 1}

        total={questions.length}

        onAnswer={handleAnswer}

      />



      <button
        onClick={onQuit}
        className="mt-6 text-sm text-shell-300/60 hover:text-shell-100"
      >
        ← Quitter
      </button>


    </div>

  );

}