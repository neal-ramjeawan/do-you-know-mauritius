import { FOOD } from "./ferneyQuestions/food";
import { PLACES } from "./ferneyQuestions/places";
import { CULTURE } from "./ferneyQuestions/culture";
import { NATURE } from "./ferneyQuestions/nature";
import { HISTORY } from "./ferneyQuestions/history";
import { FUN } from "./ferneyQuestions/fun";
import { MORE } from "./ferneyQuestions/more";


export const FERNEY_SPECIAL = {

  id: "ferney-special",

  title: "🇲🇺 Ferney Special",

  description:
    "Devinettes mauriciennes et questions fun pour le voyage 🚍",


  questions: [

    ...FUN,
    ...MORE

  ],

};