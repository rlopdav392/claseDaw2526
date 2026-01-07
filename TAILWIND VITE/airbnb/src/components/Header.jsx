import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faGlobe,
  faBars,
  faCircleArrowRight,
  faLeftRight,
  faToggleOff,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useEffect, useState } from "react";
import { ThemeSwitcher } from "./theme/ThemeSwitcher";

function Header() {
  const firstRef = useRef(null);
  const firstPlaceholderRef = useRef(null);

  const [firstSticky, setFirstSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === firstPlaceholderRef.current) {
            setFirstSticky(!entry.isIntersecting);
          }
        });
      },
      { root: null, threshold: 0 }
    );

    if (firstPlaceholderRef.current)
      observer.observe(firstPlaceholderRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <header className="flex flex-col gap-2">
      <div ref={firstPlaceholderRef}></div>

      <div
        className={`${
          firstSticky
            ? "fixed top-0 left-0 w-screen z-50 bg-white shadow-md"
            : ""
        }`}
        ref={firstRef}
      >
        <section className="grid grid-cols-[auto_1fr_auto] px-16 py-4 w-screen border-b border-neutral-300 items-center transition-all duration-300">
          <img
            src="static/airbnb-logo.png"
            alt="logo airbnb"
            className="h-16 w-28"
          />
          <div className="justify-self-center flex w-fit h-fit justify-evenly items-center rounded-full shadow-md px-4 py-3 gap-2.5">
            <a className="border-r-2 border-gray-500/30 text-sm font-medium px-4">
              anywhere
            </a>
            <a className="border-r-2  border-gray-500/30 text-sm font-medium px-4">
              Any week
            </a>
            <a className="text-sm font-medium text-gray-500 px-4">Add guests</a>
            <button className="p-2 bg-red-500 text-white rounded-full">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
          <div className="flex items-center justify-end gap-4">
            <a className="text-sm font-medium">Airbnb your home</a>
            <button className="flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faGlobe} />
              <span className="text-sm font-medium">language</span>
            </button>
            <div className="flex items-center justify-center rounded-full shadow-md gap-2 py-1.25 pr-1.25 pl-3">
              <FontAwesomeIcon icon={faBars} />
              <button className="bg-black text-white rounded-full text-center h-7 w-7 text-[10px] font-semibold">
                E
              </button>
            </div>
            <ThemeSwitcher />
          </div>
        </section>
        {/* Category bar minuto 25 */}

        <section className="container-custom transition-all duration-300">
          <div className="padding-custom flex items-center justify-between gap-14">
            <div className="flex items-center justify-center gap-10">
              <div className="flex flex-col items-center text-gray-400 hover:text-black gap-2">
                <img
                  src="static/type1.jpeg"
                  alt="Amazing pool"
                  className="h-6 w-6"
                />
                <p className="text-xs font-normal">Amazing pool</p>
              </div>
              <div className="flex flex-col items-center text-gray-400 hover:text-black gap-2">
                <img
                  src="static/type1.jpeg"
                  alt="Amazing pool"
                  className="h-6 w-6"
                />
                <p className="text-xs font-normal">Amazing pool</p>
              </div>
              <div className="flex flex-col items-center text-gray-400 hover:text-black gap-2">
                <img
                  src="static/type1.jpeg"
                  alt="Amazing pool"
                  className="h-6 w-6"
                />
                <p className="text-xs font-normal">Amazing pool</p>
              </div>
              <div className="flex flex-col items-center text-gray-400 hover:text-black gap-2">
                <img
                  src="static/type1.jpeg"
                  alt="Amazing pool"
                  className="h-6 w-6"
                />
                <p className="text-xs font-normal">Amazing pool</p>
              </div>
              <div className="flex flex-col items-center text-gray-400 hover:text-black gap-2">
                <img
                  src="static/type1.jpeg"
                  alt="Amazing pool"
                  className="h-6 w-6"
                />
                <p className="text-xs font-normal">Amazing pool</p>
              </div>
              <div className="flex flex-col items-center text-gray-400 hover:text-black gap-2">
                <img
                  src="static/type1.jpeg"
                  alt="Amazing pool"
                  className="h-6 w-6"
                />
                <p className="text-xs font-normal">Amazing pool</p>
              </div>
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} />
            <div className="flex justify-center items-center rounded-xl shadow-md h-12 w-24 gap-2">
              <FontAwesomeIcon icon={faLeftRight} />
              <p className="text-xs font-medium">filters</p>
            </div>
          </div>
        </section>
      </div>

      <section className="container-custom">
        <div className="padding-custom flex items-center justify-between gap-12 border border-gray-500/30 rounded-xl ">
          <div className="flex items-center justify-center gap-4">
            <p className="border-r-2 pr-4 border-gray-100 text-base font-medium">
              Display total price
            </p>
            <p className="text-gray-400 text-base">
              Includes all fees, before taxes
            </p>
          </div>

          <FontAwesomeIcon icon={faToggleOff} className="w-30 h-30" />
        </div>
      </section>
    </header>
  );
}

export default Header;
