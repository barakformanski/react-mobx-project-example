/* eslint-disable jsx-a11y/img-redundant-alt */
import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { Status, Transition } from "../../interface";
import "../List.css";
import store from "../../store";
import { observer } from "mobx-react";
import { BallTriangle } from "react-loader-spinner";
import { toJS } from "mobx";

const TransitionList: FC = (): ReactElement => {
  const selectNameRef = useRef<HTMLInputElement>(null);
  const selectFromRef = useRef<HTMLSelectElement>(null);
  const selectToRef = useRef<HTMLSelectElement>(null);

  let optionsArray: string[] = store.statuses.map(
    (status: Status) => status.title
  );

  const transitions = store.transitions;

  const checkValidation = () => {
    if (
      selectNameRef.current?.value.length === 0 ||
      selectFromRef.current?.value.length === 0 ||
      selectToRef.current?.value.length === 0
    ) {
      console.log("SHOULD RETURN TRUE");
      setValidation(true);
      return true;
    } else {
      console.log("SHOULD RETURN FALSE");
      setValidation(false);

      return false;
    }
  };

  const [validation, setValidation] = useState(false);

  const handleChange = () => {
    checkValidation();
  };
  const handleSubmit = (e: any) => {
    console.log(e.target);

    store.makingRequestStatus(true);
    e.preventDefault();
    store.PostToServer(
      `${store.baseUrl}add/transition`,
      {
        title: e.target.transitionName.value,
        from: e.target.fromSelect.value,
        to: e.target.toSelect.value,
      },
      null,
      null
    );
  };
  useEffect(() => {
    console.log(toJS(transitions));
  });
  return (
    <div className="list-container">
      <h2>Add transition</h2>
      <div className="control-buttons-container">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label>
            name
            <input
              type="text"
              name="transitionName"
              onChange={handleChange}
              ref={selectNameRef}
            />
          </label>
          <label>from:</label>
          <select name="fromSelect" ref={selectFromRef} onChange={handleChange}>
            {optionsArray &&
              optionsArray.map((opt) => {
                return <option value={opt}>{opt}</option>;
              })}
          </select>
          <label>to:</label>
          <select name="toSelect" ref={selectToRef} onChange={handleChange}>
            {optionsArray &&
              optionsArray.map((opt) => {
                return <option value={opt}>{opt}</option>;
              })}
          </select>
          <input
            type="submit"
            value="Add"
            className="add-button"
            disabled={validation}
          />
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
        {transitions.length ? (
          transitions.map((transition: Transition) => {
            return (
              <li key={transition._id} className="li-container">
                <span>{transition.title} : </span>
                <span>{transition.from?.title}</span>
                {"\u{02192}"}
                <span>{transition.to?.title}</span>

                <button
                  className="delete-button bold"
                  onClick={() => {
                    store.deletetransition(transition._id);
                  }}
                >
                  delete
                </button>
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

const transitionObserver = observer(TransitionList);

export default transitionObserver;
