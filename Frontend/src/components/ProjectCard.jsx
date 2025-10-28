export default function ProjectCard({ project }) {
  return (
    <div className="border rounded-xl shadow-md p-4 transition hover:shadow-xl">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-300">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {project.techStack.map((tech) => (
          <span key={tech} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-md">{tech}</span>
        ))}
      </div>
      {project.liveUrl || project.githubUrl ? (
        <div className="flex gap-2 mt-3">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-green-600 dark:text-green-400 hover:underline">Live</a>}
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-800 dark:text-gray-200 hover:underline">GitHub</a>}
        </div>
      ) : null}
    </div>
  );
}
