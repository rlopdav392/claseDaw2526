import Skill from "./Skill";

export default function SkillList({ skills }) {
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill
          skillName={skill.skill}
          level={skill.level}
          color={skill.color}
          key={skill.skill}
        />
      ))}
    </div>
  );
}
