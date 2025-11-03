import { Store } from "./store"
import Index from "./components"
import { Provider } from "react-redux"

function App() {
  return (
    <Provider store={Store}>
      <Index/>
    </Provider>
  )
}

export default App
