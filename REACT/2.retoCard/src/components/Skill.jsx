export default function Skill({ skillName, level, color }) {
  console.log(skillName);
  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span>{skillName}</span>
      {level === "beginner" && <span>😢</span>}
      {level === "intermediate" && <span>😃</span>}
      {level === "advanced" && <span>😎</span>}
    </div>
  );
}
