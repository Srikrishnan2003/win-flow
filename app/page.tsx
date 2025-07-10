import TaskFlowBuilder from "@/components/TaskFlowBuilder";
import TopBar from "@/components/TopBar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <TaskFlowBuilder />
    </div>
  )
}