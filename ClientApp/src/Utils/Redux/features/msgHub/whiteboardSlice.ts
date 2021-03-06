
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MovePostItPayload } from '../../../../Types/movePostItPayload';
import { NewBlockTextPayloadFromServer } from '../../../../Types/newBlockTextPayload';
import { TextBlock } from '../../../../Types/textBlock';
import { Whiteboard } from '../../../../Types/whiteboard';
import { getWhiteboard } from '../../../api';

import { RootState } from '../../store';
import { EditTextBlockTextFromClient } from '../../../../Types/editTextBlockText';
import { DeleteTextBlockFromServer } from '../../../../Types/deleteTextBlock';
import { IsPostItMovingFromServer } from '../../../../Types/isPostItMoving';
import { TrashPostItFromServer } from '../../../../Types/trashPostIt';
import { NewPostItPayloadFromServer } from '../../../../Types/newPostItPayload';
import { EditPostItHeaderFromServer } from '../../../../Types/editPostItHeader';


export interface WhiteboardState {
  whiteboard: Whiteboard | undefined,
  fetchingWhiteboardStatus: "off" | "pending" | "done",
  usersLoggedIn: string[]
}

const initialState: WhiteboardState = {
  whiteboard: undefined,
  fetchingWhiteboardStatus: "off",
  usersLoggedIn: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const fetchWhiteboard = createAsyncThunk(
  'whiteboard/fetchStatus',
  async (id: string, thunkAPI) => {
    const response = await getWhiteboard(id);
    return response;
  }
)

export const whiteboardState = createSlice({
  name: 'whiteboardState',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setWhiteboard: (state, action) => {
      state.whiteboard = action.payload;
    },
    logInUser: (state, action) => {
      state.usersLoggedIn.push(action.payload);
    },
    logOutUser: (state, action) => {
      state.usersLoggedIn.splice(state.usersLoggedIn.findIndex(t => t === action.payload), 1);
    },
    setUsersLoggedIn: (state, action) => {
      state.usersLoggedIn.push(action.payload);
    },
    setPostItPosition: (state, action: PayloadAction<MovePostItPayload>) => {
      if (state.whiteboard !== undefined) {
        const index = state.whiteboard.postits.findIndex(p => p.id === action.payload.postItId);
        if (index != null) {
          state.whiteboard.postits[index].position.x = action.payload.x;
          state.whiteboard.postits[index].position.y = action.payload.y;
        } else {
          throw new Error("Redux didn't find positit index!")
        }
      }
    },
    setPostItIsMoving: (state, action: PayloadAction<IsPostItMovingFromServer>) => {
      if (state.whiteboard !== undefined) {
        const index = state.whiteboard.postits.findIndex(p => p.id === action.payload.postItId);
        if (index != null) {
          state.whiteboard.postits[index].position.isMoving = action.payload.value;
        } else {
          throw new Error("Redux didn't find positit index!")
        }
      }
    },
    setNewTextBlock: (state, action: PayloadAction<NewBlockTextPayloadFromServer>) => {
      if (state.whiteboard !== undefined) {
        const block: TextBlock = {
          author: action.payload.author,
          formatting: [],
          id: action.payload.id,
          lastUpdated: action.payload.lastUpdatedOn,
          text: ""
        }
        state.whiteboard.postits.find(p => p.id === action.payload.postItId)?.body.push(block);
      }
    },
    editTextBlockText: (state, action: PayloadAction<EditTextBlockTextFromClient>) => {
      if (state.whiteboard !== undefined) {
        state.whiteboard.postits.find(p => p.id === action.payload.postItId)!.body.find(b => b.id === action.payload.textBlockId)!.text = action.payload.value;
      }
    },
    deleteTextBlock: (state, action: PayloadAction<DeleteTextBlockFromServer>) => {
      if (state.whiteboard !== undefined) {
        const index = state.whiteboard.postits.find(p => p.id === action.payload.postItId)!.body.findIndex(b => b.id === action.payload.textBlockId);
        state.whiteboard.postits.find(p => p.id === action.payload.postItId)!.body.splice(index, 1);

      }
    },
    newPostIt: (state, action: PayloadAction<NewPostItPayloadFromServer>) => {
      if (state.whiteboard !== undefined) {
        if (state.whiteboard.postits === undefined) {
          state.whiteboard.postits = [];
        }
        state.whiteboard.postits.push(action.payload);
      }
    },
    editPostItHeader: (state, action: PayloadAction<EditPostItHeaderFromServer>) => {
      if (state.whiteboard !== undefined) {
        state.whiteboard.postits.find(p => p.id === action.payload.postItId)!.header = action.payload.value;
      }
    },
    trashPostIt: (state, action: PayloadAction<TrashPostItFromServer>) => {
      if (state.whiteboard !== undefined) {
        const index = state.whiteboard.postits.findIndex(p => p.id === action.payload.postItId);
        state.whiteboard.postits.splice(index, 1);
      }
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchWhiteboard.pending, (state, action) => {
        state.fetchingWhiteboardStatus = "pending";

      })
      .addCase(fetchWhiteboard.fulfilled, (state, action) => {
        // Add user to the state array
        state.fetchingWhiteboardStatus = "done";
        state.whiteboard = action.payload;
      })
  }
});

export const { setWhiteboard,
  setUsersLoggedIn,
  setPostItPosition,
  setPostItIsMoving,
  logInUser,
  logOutUser,
  setNewTextBlock,
  deleteTextBlock,
  newPostIt,
  trashPostIt,
  editPostItHeader,
  editTextBlockText } = whiteboardState.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.smartHut.value)`
export const selectWhiteboard = (state: RootState) => state.whiteboardReducer.whiteboard;
export const selectLoggedInUsers = (state: RootState) => state.whiteboardReducer.usersLoggedIn;
export const selectFetchWhiteboardStatus = (state: RootState) => state.whiteboardReducer.fetchingWhiteboardStatus;



export default whiteboardState.reducer;
