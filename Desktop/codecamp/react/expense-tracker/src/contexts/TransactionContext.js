import axios from "axios";
import { createContext, useReducer, useEffect } from "react";
import {
  transactionReducer,
  FETCH_TRANSACTION,
} from "../reducer/transactionReducer";

const TransactionContext = createContext();

function TransactionContextProvider({ children }) {
  const [state, dispatch] = useReducer(transactionReducer, []);

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:8080/transactions")
  //       .then((res) => {
  //         dispatch({
  //           type: FETCH_TRANSACTION,
  //           value: { transactions: res.data.transactions },
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("http://localhost:8080/transactions");
        dispatch({
          type: FETCH_TRANSACTION,
          value: { transactions: res.data.transactions },
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchTransactions();
  }, []);
  return (
    <TransactionContext.Provider value={{ transactions: state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
}

export { TransactionContext, TransactionContextProvider };
