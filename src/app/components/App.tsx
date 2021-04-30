import React from 'react';
import { Redirect, Switch, BrowserRouter } from "react-router-dom";
import Layout from "src/app/components/Layout/Layout";
import { ROUTE } from "src/app/configs/constants";
import useSettingUpAccount from "src/app/hooks/useSettingUpAccount";
import GlobalErrorBoundary from "src/app/components/ErrorBoundaries/GlobalErrorBoundary";
import Home from "src/app/components/Home/Home";
import { ModalListener } from "src/app/components/Commons/Modals/ModalListener";
import useFetchingData from "src/app/hooks/useFetchingData";
import LoadingModal from "src/app/components/Commons/Modals/LoadingModal";

const App: React.FC = () => {
  useFetchingData();
  useSettingUpAccount();

  return (
    <div className="app">
      <GlobalErrorBoundary>
        <BrowserRouter>
          <Switch>
            <Layout path={ROUTE.HOME} component={Home} exact={false}/>
            <Redirect to={ROUTE.HOME}/>
          </Switch>
        </BrowserRouter>

        <ModalListener/>
        <LoadingModal/>
      </GlobalErrorBoundary>
    </div>
  )
};

export default App;
