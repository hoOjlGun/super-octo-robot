import AgentStatus from '../AgentStatus'

export default function AgentStatusExample() {
  return (
    <div className="space-y-4 p-4">
      <AgentStatus type="main" state="idle" />
      <AgentStatus type="main" state="thinking" />
      <AgentStatus type="revisor" state="completed" />
    </div>
  )
}
