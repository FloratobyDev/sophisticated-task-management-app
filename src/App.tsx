import { Route, Routes } from "react-router-dom";
import Projects from "./pages/Projects";
import ProjectTasks from "./pages/Tasks";


function App() {


  return (
    <main className="min-h-screen flex justify-center mx-auto flex-col w-[40%]">
     <Routes>
      <Route path="/" element={<Projects />} />
      <Route path="/projects/:projectId" element={<ProjectTasks />} />
     </Routes>
    </main>
  );
}

export default App;
