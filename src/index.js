import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createRoot } from "react-dom/client";
import reducers from "./reducers/indexReducer";
import './index.css'

const store = createStore(reducers, compose(applyMiddleware(thunk)));


const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
