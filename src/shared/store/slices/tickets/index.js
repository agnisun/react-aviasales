import { createSlice } from "@reduxjs/toolkit";

import { fetchTickets } from "./thunk";

const ticketsSlice = createSlice({
	name: "tickets",
	initialState: {
		isInit: false,
		isLoading: true,
		error: {
			message: "",
		},
		tickets: [],
		searchId: "",
		stop: false,
		visibleItems: 5,
		all: false,
		noSegments: false,
		oneSegments: false,
		twoSegments: false,
		threeSegments: false,
		sortMode: "cheap",
	},
	reducers: {
		updateVisibleItems: (state) => {
			state.visibleItems = Math.min(state.visibleItems + 5, state.tickets.length);
		},
		updateFilters: (state, action) => {
			const { key, value } = action.payload;

			if (key === "all") {
				state.noSegments = value;
				state.oneSegments = value;
				state.twoSegments = value;
				state.threeSegments = value;
				state.all = value;
			} else {
				state[key] = value;

				if (state.noSegments && state.oneSegments && state.twoSegments && state.threeSegments) state.all = true;
				else state.all = false;
			}
		},
		updateSortMode: (state, action) => {
			state.sortMode = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTickets.pending, (state) => {
				if (!state.isInit) state.isLoading = true;
			})
			.addCase(fetchTickets.fulfilled, (state, action) => {
				if (action.payload.success) {
					state.tickets = state.tickets.concat(action.payload.tickets);
					state.stop = action.payload.stop;
					state.searchId = action.payload.searchId;
				} else {
					state.error.message = action.payload.message;
				}

				state.isLoading = false;
				state.isInit = true;
			});
	},
});

export const { updateVisibleItems, updateFilters, updateSortMode } = ticketsSlice.actions;
export default ticketsSlice.reducer;
