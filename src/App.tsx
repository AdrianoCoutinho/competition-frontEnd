import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ClippedDrawer } from "./shared/components/drawer/Drawer";
import { AppThemeProvider } from "./shared/contexts";
import { AuthProvider } from "./shared/contexts/AuthContext";
import { store } from "./store";
import { Login } from "./pages";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppThemeProvider>
          <Login>
            <BrowserRouter>
              <ClippedDrawer>
                <AppRoutes />
              </ClippedDrawer>
            </BrowserRouter>
          </Login>
        </AppThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
