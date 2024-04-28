"use client";

import axios from "@src/utils/axios";
import { tokenInvalid, tokenValid } from "@src/redux/slices/employee";
import { useDispatch } from "@src/redux/store";
import { useCallback, useEffect } from "react";

const AuthorizationProvider = ({ children }) => {
  const dispatch = useDispatch();

  const refresh = useCallback(async () => {
    try {
      const { data } = await axios.get("/employee");
      dispatch(tokenValid(data.result.employee));
    } catch (error) {
      console.log(error);
      localStorage.removeItem("access-token");
      dispatch(tokenInvalid());
    }
  }, [dispatch]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return children;
};

export default AuthorizationProvider;
