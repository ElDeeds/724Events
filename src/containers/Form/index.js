import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// Une fonction de simulation d'appel API asynchrone pour les tests
const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); })

const Form = ({ onSuccess, onError }) => {
  // State local pour suivre l'état de l'envoi du formulaire
  const [sending, setSending] = useState(false);

  // Fonction pour gérer l'envoi du formulaire
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      // On essaie d'appeler mockContactApi (simulant une requête asynchrone)
      try {
        await mockContactApi();
        setSending(false); // L'envoi est terminé
        onSuccess(); // Appeler la fonction onSuccess en cas de succès
      } catch (err) {
        setSending(false); // L'envoi est terminé en cas d'erreur
        onError(err); // Appeler la fonction onError en cas d'erreur
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="Votre nom" label="Nom" />
          <Field placeholder="Votre prénom" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field type={FIELD_TYPES.INPUT_MAIL} placeholder="Votre Email" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;