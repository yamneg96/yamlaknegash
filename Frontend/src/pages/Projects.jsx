// src/pages/Projects.jsx
import React, { useEffect } from "react";
import { useProjectStore } from "../Store/useProjectStore";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const { projects, loadProjects, page, pages, setPage } = useProjectStore();

  useEffect(() => {
    loadProjects(page);
  }, [page, loadProjects]);

  return (
    <div className="pt-24 px-4 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">All Projects</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No projects found.</p>
        ) : (
          projects.map((p) => <ProjectCard key={p._id} project={p} />)
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-3">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
          disabled={page === 1}
        >
          Prev
        </button>

        {[...Array(pages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage(Math.min(pages, page + 1))}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
          disabled={page === pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
