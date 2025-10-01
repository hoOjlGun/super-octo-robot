import { useState } from 'react'
import ActivityBar, { type ModuleType } from '../ActivityBar'

export default function ActivityBarExample() {
  const [activeModule, setActiveModule] = useState<ModuleType>("terminal")
  
  return <ActivityBar activeModule={activeModule} onModuleChange={setActiveModule} />
}
