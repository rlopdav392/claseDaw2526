import { useParams } from "react-router-dom";
function ProductDetail() {
  const { productId } = useParams();
  return (
    <div>
      <h1>Detalle del producto {productId}</h1>
    </div>
  );
}

export default ProductDetail;
