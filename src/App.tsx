import { useEffect } from "react";
import "./App.css";
import StatusesListObserver from "./components/statusesList/StatusesList";
import TransitionObserver from "./components/transitionList/transitionList";
import store from "./store";
import { observer } from "mobx-react";
import { BallTriangle } from "react-loader-spinner";

function App() {
  useEffect(() => {
    store.loadData();
  });

  return (
    <div className="body-container">
      <h1 className="header">build a work flow</h1>
      {store.finishLoadingData ? (
        <div className="main-container">
          <div className="content-container">
            <div className="statuses-column">
              <StatusesListObserver />
            </div>
            <div className="transitions-column">
              <TransitionObserver />
            </div>
          </div>
        </div>
      ) : (
        <div className="main-container">
          <div>LOADING DATA...</div>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            visible={true}
          />
        </div>
      )}
      {store.finishLoadingData && (
        <button className="round-button" onClick={() => store.DeleteAll()}>
          Reset
        </button>
      )}
    </div>
  );
}
const AppObserver = observer(App);

export default AppObserver;
