import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CategoryNames } from "../types/category";
import { School } from "../types/school";
import { loadSchoolsThunk } from "./schoolThunks";

type Visitors = {
  [id: string]: {
    [CategoryNames.ELEMENTARY]?: number;
    [CategoryNames.JUNIORHIGH]?: number;
    [CategoryNames.SENIORHIGH]?: number;
    [CategoryNames.COLLEGE]?: number;
    [CategoryNames.COMMUNITY]?: number;
  }
}

type State = {
  visitors: Visitors;
  schools: School[];
}

const initialState: State = {
  visitors: {},
  schools: [],
}

const visitorSlice = createSlice({
  name: 'visitorSlice',
  initialState,
  reducers: {
    addVisitor: (state, {payload}: PayloadAction<{
      id: string;
      category: CategoryNames,
      count: number
    }>) => {
      if (state.visitors?.[payload.id]?.[payload.category]) {
        state.visitors![payload.id][payload.category]! += payload.count;
        return;
      }

      state.visitors![payload.id] = {
        ...state.visitors![payload.id],
        [payload.category]: payload.count
      }
    },
    subtractVisitor: (state, {payload}: PayloadAction<{
      id: string;
      category: CategoryNames,
      count: number
    }>) => {
      if (state.visitors?.[payload.id]?.[payload.category]) {
        state.visitors![payload.id][payload.category]! -= payload.count;
        return;
      }

      state.visitors![payload.id] = {
        ...state.visitors![payload.id],
        [payload.category]: payload.count
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(
      loadSchoolsThunk.fulfilled,
      (state, {payload}) => {
        state.schools = payload || [];
      }
    )
  }
})

export const {addVisitor, subtractVisitor} = visitorSlice.actions
export default visitorSlice.reducer