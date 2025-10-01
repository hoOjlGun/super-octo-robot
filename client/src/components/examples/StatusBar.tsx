import StatusBar from '../StatusBar'

export default function StatusBarExample() {
  return (
    <div className="space-y-2">
      <StatusBar mainAgentState="idle" revisorAgentState="idle" />
      <StatusBar mainAgentState="thinking" revisorAgentState="idle" />
      <StatusBar mainAgentState="completed" revisorAgentState="thinking" />
    </div>
  )
}
