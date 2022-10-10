const RadioButton = ({category, option, filterValue, handleClick} ) => {

  return (
    <div>
      <input
        type="radio"
        value={`${category}=${option}`}
        name="filter"
        checked={filterValue === option}
        onChange={(event) => handleClick(event)}
      />
      <label>{option}</label>
    </div>
  );
};

export default RadioButton;
