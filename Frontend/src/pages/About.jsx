// src/pages/About.jsx
import React, { useEffect } from "react";
import { useSkillStore } from "../Store/useSkillStore";

export default function About() {
  const { skills, loadSkills } = useSkillStore();

  useEffect(() => {
    loadSkills();
  }, []);

  return (
    <div className="pt-24 px-4 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>

      <div className="max-w-3xl">
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          I am <strong>YN</strong>, a Fullstack Developer & Project Manager with experience building startup and production software.
          I work with MERN, Django, React Native and modern tooling. I've built projects like <strong>NYDev</strong>, <strong>BNS</strong>, <strong>ABC Bakery</strong>, <strong>ProcedureNotifier</strong> and <strong>NNMKC Church Website</strong>.
        </p>

        <h3 className="text-2xl font-semibold mb-3">Skills</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {skills.length === 0 ? (
            <p className="text-gray-500">No skills added yet.</p>
          ) : (
            skills.map((s) => (
              <div key={s._id} className="p-3 border rounded">
                <div className="flex justify-between">
                  <span className="font-semibold">{s.name}</span>
                  <span className="text-sm text-gray-500">{s.level}%</span>
                </div>
                <div className="mt-2 bg-gray-200 h-3 rounded">
                  <div className="bg-blue-600 h-3 rounded" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
