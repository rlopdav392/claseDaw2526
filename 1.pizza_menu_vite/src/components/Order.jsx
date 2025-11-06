const Order = ({ order }) => {
  return (
    <div className="order">
      <p>
        Estamos abiertos actualmente desde las {order.openHour} hasta las
        {order.closeHour}
      </p>
      <button className="btn">Comprar</button>
    </div>
  );
};

export default Order;
