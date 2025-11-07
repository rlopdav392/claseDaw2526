import Pizza from "./Pizza";
import pizzaData from "../data/data.js";

const Menu = () => {
  const pizzaComponents = [];
  pizzaData.forEach((itemPizza) => {
    pizzaComponents.push(<Pizza key={itemPizza.id} pizza={itemPizza} />);
  });
  return (
    <main className="menu">
      <h2>Menu Pizza</h2>

      <div className="pizzas">{pizzaComponents}</div>
    </main>
  );
};

export default Menu;
