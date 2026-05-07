import { BrowserRouter, Routes, Route } from 'react-router-dom';

import BuilderPage from './pages/BuilderPage';
import FormPage from './pages/FormPage';
import PreviewPage from './pages/PreviewPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<BuilderPage />}
        />

        <Route
          path="/form"
          element={<FormPage />}
        />

        <Route
          path="/preview"
          element={<PreviewPage />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;