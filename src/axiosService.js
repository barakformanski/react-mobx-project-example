import { useEffect, useState } from "react";
import store from "./store";

import axios from "axios";
// export const PostToServerLoading = ({
//   route,
//   data,
//   content,
//   render,
//   response,
//   obj,
// }) => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .post(route, obj)
//       .then((res) => {
//         if (data) {
//           data(res.data);
//         }
//         if (response) {
//           response(res);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [render, route, obj]);

//   return <div>{loading ? <SpinningCircles /> : content}</div>;
// };

// export const GetDataLoading = ({ route, data, content, render, response }) => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(route)
//       .then((res) => {
//         if (data) {
//           data(res.data);
//         }
//         if (response) {
//           response(res);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [render]);

//   return <div>{loading ? <SpinningCircles /> : content}</div>;
// };
// export const PutToServerLoading = ({
//   route,
//   data,
//   content,
//   render,
//   response,
//   obj,
// }) => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .put(route, obj)
//       .then((res) => {
//         if (data) {
//           data(res.data);
//         }
//         if (response) {
//           response(res);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [render]);

//   return <div>{loading ? <SpinningCircles /> : content}</div>;
// };

export const GetData = async (url, data) => {
  axios.get(url).then(
    (res) => {
      data(res.data);
    },
    (err) => {
      console.log(err);
    }
  );
};

export const PostToServer = async (url, obj, setData, SetResponse) => {
  this.makingRequestStatus(true);
  console.log(url, obj);
  axios.post(url, obj).then(
    (res) => {
      if (setData) {
        setData(res.data);
      }
      if (SetResponse) {
        SetResponse(res);
      }
      store.loadStatuses();
    },
    (err) => {
      console.log(err);
    }
  );

  this.makingRequestStatus(false);
};

export const PutToServer = async (route, obj, response) => {
  axios.put(route, obj).then(
    (res) => {
      console.log(res);
      if (response) {
        response(res);
      }
    },
    (err) => {
      console.log(err);
    }
  );
};

export const DeleteToServer = async (_id) => {
  axios.delete(`${store.baseUrl}/delete/${_id}`).then(
    (res) => {
      console.log(res);
      store.loadStatuses();
    },
    (err) => {
      console.log(err);
    }
  );
  store.makingRequestStatus(false);
};
