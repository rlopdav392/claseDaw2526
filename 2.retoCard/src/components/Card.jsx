import SkillList from "./SkillList";
import Intro from "./Intro";
import Avatar from "./Avatar";

const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA",
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "#EFD81D",
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#C3DCAF",
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "#E84F33",
  },
  {
    skill: "React",
    level: "advanced",
    color: "#60DAFB",
  },
  {
    skill: "Svelte",
    level: "beginner",
    color: "#FF3B00",
  },
];

function Card() {
  return (
    <div className="card">
      <Avatar rutaImagen="gatos.png" />
      <div className="data">
        <Intro titulo="CARD 1" descripcion="Detalles card1" />
        <SkillList skills={skills} />
      </div>
    </div>
  );
}

export default Card;
