import React, { Component,Suspense } from "react";
import { Provider } from "react-redux";

import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./router";
import store from "./store";
import HYAppHeader from "@/components/app-header";
import HYAppFooter from "@/components/app-footer";
import HYAppPlayBar from './pages/player/app-player-bar'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <HYAppHeader />
          <Suspense fallback={<div>loading</div>}>
          {renderRoutes(routes)}
          </Suspense>
          <HYAppFooter />
          <HYAppPlayBar/>
        </HashRouter>
      </Provider>
    );
  }
}
