import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppNavigator } from "src/navigation";
import store, { persistor } from "src/store/store";

export default function App() {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </Provider>
    </PersistGate>
  );
}
