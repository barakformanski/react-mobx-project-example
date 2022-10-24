import { useEffect, useState } from "react";
import "./App.css";
import StatusesListObserver from "./components/statusesList/StatusesList";
import TransitionObserver from "./components/transition/transitionList";
import store from "./store";
import { observer } from "mobx-react";
import { BallTriangle } from "react-loader-spinner";
import useLocalStorage from "./useLocalStorage.js";
import Button from "./assets/button/Button";

function App() {
  const [tempName, setTempName] = useState("");
  const [name, setName] = useLocalStorage("name", "");
  const [edit, setEdit] = useState(false);
  const handleChange = (e: any) => {
    setTempName(e.target.value);
  };
  const handleSubmit = (e: any) => {
    setName(tempName);
    setEdit(false);
    e.preventDefault();
  };

  useEffect(() => {
    store.loadData();
  });
  // const changePagination = (direction: string) => {
  //   store.changePaginationStartPoint(direction);
  // };
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
          <div></div>
          <button className="round-button" onClick={() => store.DeleteAll()}>
            Reset
          </button>
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
    </div>
  );
}
const AppObserver = observer(App);

export default AppObserver;
