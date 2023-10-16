import "@mantine/core/styles.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import "./i18n";
import Home from "./pages/home";

function App() {
  console.log("Appppppppppppppppp");
  return (
    <div className="App">
      <DirectionProvider>
        <MantineProvider>
          {/* <Home /> */}
          <HashRouter>
            <Routes>
              <Route path="/:lang?" element={<Home />} />
            </Routes>
          </HashRouter>
        </MantineProvider>
      </DirectionProvider>
    </div>
  );
}

export default App;
