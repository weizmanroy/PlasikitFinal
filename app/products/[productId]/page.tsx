import data from "../../products.json";

function getProduct(id: any) {
  return data.items.find((p) => p.id === id);
}

export default function ProductDetail({ params }: any) {
  const productId = params.productId;
  const product = getProduct(productId);

  // Handle case where product is not found
  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Product Not Found</h1>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Product ID: {productId}</h1>
      <h2>Name: {product.name}</h2>
      <p>Description: {product.description}</p>
      <p>Grams: {product.grams}</p>
      <img
        src={product.imageURL}
        alt={product.name}
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
}
