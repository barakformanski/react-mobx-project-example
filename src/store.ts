import { makeAutoObservable } from "mobx";
import { Status, Transition } from "./interface";
import axios from "axios";

class Store {
  baseUrl = "http://localhost:4001/crud/";
  transitions: Transition[] = [];
  statuses: Status[] = [];
  finishLoadingData: boolean = false;
  selectedStatus: Status | undefined = undefined;
  makingRequset: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }
  makingRequestStatus(reqStatus: boolean) {
    this.makingRequset = reqStatus;
  }

  async loadData() {
    console.log("LOADING");

    const statuses = await fetch(`${this.baseUrl}getAllStatuses`).then((res) =>
      res.json()
    );
    this.statuses = statuses;
    const transitions = await fetch(`${this.baseUrl}getAllTransitions`).then(
      (res) => res.json()
    );
    this.transitions = transitions;
    this.finishLoadingData = true;
  }

  PostToServer = async (
    url: string,
    obj: object,
    setData: any,
    SetResponse: any
  ) => {
    console.log(url, obj);
    axios.post(url, obj).then(
      (res) => {
        if (setData) {
          setData(res.data);
        }
        if (SetResponse) {
          SetResponse(res);
        }
        this.loadData();
      },
      (err) => {
        console.log(err);
      }
    );
    this.makingRequestStatus(false);
  };

  DeleteToServer = async (_id: string) => {
    axios.delete(`${this.baseUrl}/delete/${_id}`).then(
      (res) => {
        console.log(res);
        this.loadData();
      },
      (err) => {
        console.log(err);
      }
    );
    this.makingRequestStatus(false);
  };
  deletetransition = async (_id: string) => {
    axios.delete(`${this.baseUrl}/deletetransition/${_id}`).then(
      (res) => {
        console.log(res);
        this.loadData();
      },
      (err) => {
        console.log(err);
      }
    );
    this.makingRequestStatus(false);
  };

  DeleteAll = async () => {
    this.makingRequestStatus(true);
    axios.delete(`${this.baseUrl}/deleteAll`).then(
      (res) => {
        console.log(res);
        this.loadData();
      },
      (err) => {
        console.log(err);
      }
    );
    this.makingRequestStatus(false);
  };

  PutToServer = async (
    url: string,
    obj: object,
    setData: any,
    SetResponse: any
  ) => {
    this.makingRequestStatus(true);
    axios.patch(url, obj).then(
      (res) => {
        console.log(res);
        if (SetResponse) {
          SetResponse(res);
        }
        this.loadData();
      },
      (err) => {
        console.log(err);
      }
    );
    this.makingRequestStatus(false);
  };
}

const store = new Store();
export default store;
