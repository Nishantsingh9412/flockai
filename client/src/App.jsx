import { BrowserRouter as Router } from 'react-router-dom';

import AllRoutes from "./AllRoutes";

function App() {
  return (
    <>
      <Router>
        <AllRoutes />
      </Router>
    </>
  )
}

export default App;
