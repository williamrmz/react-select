import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";

const options = [
  "Mangoes",
  "Apples",
  "Oranges",
  "Argelia",
  "Armenia",
  "Peru",
  "Alemania",
  "Andalucia"
];

const Options = (props) => {
  const { options, onOptionClicked, selectedOption, filteringSearch } = props;

  if (filteringSearch(options).length > 0) {
    return filteringSearch(options).map((option) => (
      <li
        className="field-select__opt"
        key={option}
        onClick={() => onOptionClicked(option)}
        value={selectedOption === option}
      >
        {option}
      </li>
    ));
  }
  return <li className="field-select__no-opt">No hay opciones.</li>;
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Armenia");
  const [textFilter, setTextFilter] = useState("");
  const wrapperRef = useRef();

  const filteringSearch = (opt) =>
    opt.filter((el) => el.toLowerCase().indexOf(textFilter.toLowerCase()) > -1);

  const onInputClicked = () => {
    setIsOpen(!isOpen);
  };

  const onOptionClicked = (value) => {
    setIsOpen(false);
    setSelectedOption(value);
    setTextFilter("");
  };

  const onChangeText = (e) => {
    setIsOpen(true);
    setTextFilter(e.target.value);
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
      setTextFilter("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const propsOptions = {
    options,
    onOptionClicked,
    selectedOption,
    filteringSearch
  };

  return (
    <div className="container">
      <div
        className="field-select"
        ref={wrapperRef}
        onClick={() => onInputClicked()}
      >
        <input
          className="field-select__input"
          onChange={(e) => onChangeText(e)}
          placeholder={selectedOption}
          type="text"
          value={textFilter}
        />
        {isOpen && (
          <div className="field-select__list-ctn">
            <ul className="field-select__list">
              <Options {...propsOptions} />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
