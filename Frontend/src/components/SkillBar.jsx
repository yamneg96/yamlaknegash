export default function SkillBar({ skill }) {
  return (
    <div className="my-2">
      <p className="font-semibold">{skill.name}</p>
      <div className="bg-gray-300 h-4 rounded">
        <div className="bg-primary h-4 rounded" style={{ width: `${skill.level}%` }}></div>
      </div>
    </div>
  );
}
