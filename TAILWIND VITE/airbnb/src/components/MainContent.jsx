import Card from "./Card";
function MainContent() {
  const cards = Array.from({ length: 16 });
  return (
    <main className="container-custom padding-custom">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((_, index) => (
          <Card key={index} />
        ))}
      </div>
    </main>
  );
}

export default MainContent;
