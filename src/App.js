import { Provider } from "react-redux";
import store from "./store/store";
import RoutesProvider from "./routes/RoutesProvider";

function App() {
  return (
    <>
      <Provider store={store}>
        <RoutesProvider />
      </Provider>
    </>
  );
}

export default App;
