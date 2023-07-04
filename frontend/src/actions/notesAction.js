import {
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_DELETE_FAIL,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_SUCCESS,
} from "../constants/notesConstant";

import axios from "axios";

export const listNotes = () => async (dispatch, getState) => {
  // nested arrow function is only possible by the redux thunk
  try {
    dispatch({
      type: NOTES_LIST_REQUEST,
    });

    // we are fetching userInfo from the state by getState function in our Redux actions
    // getState contains all of our app states
    // (here we are fetching userLogin's userInfo state from getState())
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      // as note is protected so have to give Authorization to user by their token
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data}  = await axios.get("/api/notes", config);

    dispatch({
      type: NOTES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = // error message coming from the backend
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTES_LIST_FAIL,
      payload: message,
    });
  }
};

export const list10sortedNotes = () => async (dispatch, getState) => {
  // nested arrow function is only possible by the redux thunk
  try {
    dispatch({
      type: NOTES_LIST_REQUEST,
    });

    const config = {
      // as note is protected so have to give Authorization to user by their token
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/notes/sorted10contents", config);

    dispatch({
      type: NOTES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = // error message coming from the backend
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTES_LIST_FAIL,
      payload: message,
    });
  }
};

export const createNoteAction = // exported to createNote.js file
  (title, content, category, author, pictures, videoCaption, ytVideos) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTES_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json", // this is very important ( in which formate of data we wants to show on the screen)
          Authorization: `Bearer ${userInfo.token}`, //  and authorization bcoz we protected data from unauthorized access
        },
      };

      const { data } = await axios.post(
        "/api/notes/create",
        { title, content, category, author, pictures, videoCaption, ytVideos },
        config
      );

      dispatch({
        type: NOTES_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_CREATE_FAIL,
        payload: message,
      });
    }
  };


export const updateNoteAction =
  (id, title, content, category, author, pictures) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTES_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/notes/${id}`,
        { title, content, category, author, pictures },
        config
      );

      dispatch({
        type: NOTES_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_UPDATE_FAIL,
        payload: message,
      });
    }
  };


  export const deleteNoteAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTES_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
        
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(
        `/api/notes/${id}`, config);

      dispatch({
        type: NOTES_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_DELETE_FAIL,
        payload: message,
      });
    }
  };
