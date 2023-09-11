// Définition d'un objet MONTHS qui mappe les numéros de mois aux noms des mois 
export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

// Définition de la fonction getMonth qui prend une date en entrée et retourne le nom du mois correspondant
export const getMonth = (date) => {
  // Récupération du numéro de mois (0-11) à partir de la date, puis ajout de 1 pour obtenir le numéro de mois (1-12)
  const monthNumber = date.getMonth() + 1;
  
  // Utilisation de l'objet MONTHS pour obtenir le nom du mois correspondant au numéro
  return MONTHS[monthNumber];
};
