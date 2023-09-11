import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  // Utilisation du hook useData pour obtenir les données globales
  const { data } = useData();
  
  // State local pour suivre l'index de la diapositive actuellement affichée
  const [index, setIndex] = useState(0);

  // Tri des événements par date décroissante
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // Fonction pour passer à la diapositive suivante
  const nextCard = () => {
    if (byDateDesc !== undefined) {
      // Utilisation de setTimeout pour déclencher le changement de diapositive toutes les 5 secondes
      setTimeout(
        () =>
          index < byDateDesc.length - 1 ? setIndex(index + 1) : setIndex(0),
        5000
      );
    }
  };

  // Utilisation de useEffect pour appeler nextCard lorsque le composant est monté
  useEffect(() => {
    nextCard();
  }, []);

  // Utilisation de useEffect pour surveiller les changements de la fonction getMonth (s'il y en a)
  useEffect(() => {
    // Code à exécuter en réponse aux changements de getMonth
  }, [getMonth]);


  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={`${event.title}`}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
           <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${radioIdx +1}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => nextCard(radioIdx)}
                />
              ))}
            </div>
          </div>
        </div> 
      ))}
    </div>
  );
};

export default Slider;