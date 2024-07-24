import React from 'react'
import '@xyflow/react/dist/style.css'
import FlowRender from './components/FlowRender'
import './App.css'
import { ReactFlowProvider } from '@xyflow/react'

const App = () => {
  return (
    <ReactFlowProvider>
      <FlowRender />
    </ReactFlowProvider>
  )
}

export default App