import { configureStore } from "@reduxjs/toolkit";

import ticketsReducer from "./slices/tickets";

export const store = configureStore({
	reducer: {
		tickets: ticketsReducer,
	},
});
