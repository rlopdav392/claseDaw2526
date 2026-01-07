import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons"; // equivale a "language"

function LanguageButton() {
  return (
    <button className="flex items-center gap-2">
      <FontAwesomeIcon icon={faGlobe} /> {/* Aquí va el "language" */}
      <span className="text-sm font-medium">Language</span>
    </button>
  );
}

export default LanguageButton;
