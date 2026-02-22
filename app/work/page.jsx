import React from "react";
import WorkGrid from "./components/WorkGrid";

export default function WorkPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-bold text-center mb-12">Work</h1>
      <WorkGrid />
    </div>
  );
}
