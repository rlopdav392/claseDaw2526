import ProductsClient from "@/components/ProductsClient";

export default function ProductsPage() {
  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 12 }}>Products (offset pagination + nuqs)</h1>
      <ProductsClient />
    </main>
  );
}
