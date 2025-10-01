import AgentStatus from "@/components/AgentStatus";
import TerminalView from "@/components/TerminalView";

export default function TerminalPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        <AgentStatus type="main" state="thinking" />
        <div className="h-[calc(100%-120px)]">
          <TerminalView />
        </div>
      </div>
    </div>
  );
}
