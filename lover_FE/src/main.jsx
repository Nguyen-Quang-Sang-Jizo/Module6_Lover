import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import theme from "./theme/theme.js";
import store from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider  store={store}>
    <BrowserRouter>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <App />
      </CssVarsProvider>
    </BrowserRouter>
  </Provider>
);
