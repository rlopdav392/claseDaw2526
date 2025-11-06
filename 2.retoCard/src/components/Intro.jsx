export default function Intro({ titulo, descripcion }) {
  return (
    <div className="intro">
      <h1 className="intro__titulo">{titulo}</h1>
      <p className="intro__contenido">{descripcion}</p>
    </div>
  );
}
