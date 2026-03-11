import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <AppRoutes />
    </>
  );
}

export default App;
