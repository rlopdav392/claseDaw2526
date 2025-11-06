const Pizza = ({ pizza }) => {
  return (
    <div className={`pizza ${pizza.soldOut && "sold-out"}`}>
      <img src={pizza.photoName} alt={pizza.name} />
      <div className="pizza-text">
        <h2>{pizza.name}</h2>
        <p>{pizza.ingredients}</p>
      </div>
    </div>
  );
};

export default Pizza;
