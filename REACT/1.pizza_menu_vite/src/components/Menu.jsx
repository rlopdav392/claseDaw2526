import Pizza from "./Pizza";
import pizzaData from "../data/data.js";

const Menu = () => {
  return (
    <main className="menu">
      <h2>Menu Pizza</h2>

      <div className="pizzas">
        {pizzaData.map((itemPizza) => (
          <Pizza key={itemPizza.name} pizza={itemPizza} loquesea="hjfafa" />
        ))}
      </div>
    </main>
  );
};

export default Menu;
