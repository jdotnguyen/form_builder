import { Routes, Route } from "react-router-dom";
import Content from './components/Content';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Content>
    </div>
  );
}

export default App;
