import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

import {
  connectSocket,
  disconnectSocket,
} from "../lib/socket.js";

import {
  setAuthUser,
  setCheckingAuth,
  setLoggingIn,
  setSigningUp,
  setUpdatingProfile,
  setOnlineUsers,
} from "./authSlice.js";

export const checkAuth = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get("/auth/checkAuth");

    dispatch(setAuthUser(res.data));
    dispatch(startSocket());
  } catch (error) {
    dispatch(setAuthUser(null));
  } finally {
    dispatch(setCheckingAuth(false));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(setLoggingIn(true));

  try {
    const res = await axiosInstance.post("/auth/signin", data);

    dispatch(setAuthUser(res.data));
    dispatch(startSocket());

    toast.success("Logged in successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  } finally {
    dispatch(setLoggingIn(false));
  }
};

export const signup = (data) => async (dispatch) => {
  dispatch(setSigningUp(true));

  try {
    const res = await axiosInstance.post("/auth/signup", data);

    dispatch(setAuthUser(res.data));
    dispatch(startSocket());

    toast.success("Account created successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Signup failed");
  } finally {
    dispatch(setSigningUp(false));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axiosInstance.post("/auth/logout");

    disconnectSocket();

    dispatch(setOnlineUsers([]));
    dispatch(setAuthUser(null));

    toast.success("Logged out successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Logout failed");
  }
};

export const updateProfile = (data) => async (dispatch) => {
  dispatch(setUpdatingProfile(true));

  try {
    const res = await axiosInstance.put("/auth/update-profile", data);

    dispatch(setAuthUser(res.data));

    toast.success("Profile updated successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Update failed");
  } finally {
    dispatch(setUpdatingProfile(false));
  }
};

export const startSocket = () => (dispatch, getState) => {
  const { authUser } = getState().auth;

  if (!authUser) return;

  const socket = connectSocket(authUser.id);

  // Remove any previous listener
  socket.off("getOnlineUsers");

  socket.on("getOnlineUsers", (users) => {
    console.log("Online Users:", users);
    dispatch(setOnlineUsers(users));
  });
};