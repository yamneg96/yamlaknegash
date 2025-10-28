import React, { useEffect } from "react";
import { useProjectStore } from "../Store/useProjectStore";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const { projects, loadProjects } = useProjectStore();

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="pt-24 px-4">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to YN Portfolio</h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">Showcasing my projects, skills, and startup work like NYDev, BNS, ABC Bakery & more.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => <ProjectCard key={p._id} project={p} />)}
        </div>
      </section>
    </div>
  );
}
