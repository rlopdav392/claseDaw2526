import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
function Card() {
  return (
    <div className="flex flex-col gap-2">
      <img src="static/img1.jpg" alt="img1" className="w-76 h-64 rounded-xl" />
      <div>
        <div className="flex justify-between">
          <p className="text-sm font-medium">Lonavla, India</p>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faStar}
              className="text-yellow-400 w-6 h-6"
            />
            <p className="text-sm font-light">5.0</p>
          </div>
        </div>

        <p className="text-sm text-gray-400">62 kilometeres away</p>
        <p className="text-sm text-gray-400">30 jul - 4 Aug</p>
      </div>
      <p className="text-sm font-medium">100 night</p>
    </div>
  );
}

export default Card;
