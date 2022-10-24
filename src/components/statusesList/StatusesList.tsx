/* eslint-disable jsx-a11y/img-redundant-alt */
import { Status } from "../../interface";
import "./StatusesList.css";
import store from "../../store";
import { observer } from "mobx-react";
import { FormEvent, useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";

const StatusesList = () => {
  const statuses = store.statuses;
  const [radioValue, setRadioValue] = useState("");
  const handleRadioChange = async (e: any, _id: any) => {
    setRadioValue(e.target.value);
    await store.PutToServer(
      `${store.baseUrl}update/${_id}`,
      { description: "INIT" },
      null,
      null
    );
  };
  const handleSubmit = (e: any) => {
    store.makingRequestStatus(true);
    e.preventDefault();
    store.PostToServer(
      `${store.baseUrl}add/status`,
      { title: e.target.statusName.value },
      null,
      null
    );
  };
  return (
    <div className="list-container">
      <h2>Add status</h2>
      <div className="control-buttons-container">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input type="text" name="statusName" />
          <input type="submit" value="Add" className="add-button" />
        </form>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          visible={store.makingRequset}
        />
      </div>
      <ul className="ul-container">
        {statuses.length ? (
          statuses.map((status: Status) => {
            return (
              <li key={status._id} className="li-container">
                <input
                  type="radio"
                  name="dynamic-radio"
                  value={status.title}
                  checked={radioValue === status.title}
                  onChange={(e) => {
                    handleRadioChange(e, status._id);
                  }}
                />
                <label>{status.title}</label>
                <button
                  className="delete-button bold"
                  onClick={() => {
                    store.DeleteToServer(status._id);
                  }}
                >
                  delete
                </button>
                <span> {status.description}</span>
              </li>
            );
          })
        ) : (
          <div>Nothing to dispaly</div>
        )}
      </ul>
    </div>
  );
};

const StatusesListObserver = observer(StatusesList);

export default StatusesListObserver;
