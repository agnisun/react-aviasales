import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";

export const fetchTickets = createAsyncThunk("tickets/fetchTickets", async function fetchThunk(id) {
	let searchId = id;

	try {
		if (!searchId) {
			const searchIdResponse = await fetch("https://aviasales-test-api.kata.academy/search");
			const searchIdData = await searchIdResponse.json();

			if (!searchIdData?.searchId) {
				return {
					success: false,
					message: "Search fetch error",
				};
			}

			searchId = searchIdData.searchId;
		}

		const ticketsResponse = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
		const ticketsData = await ticketsResponse.json();

		return {
			success: true,
			tickets: ticketsData.tickets.map((ticket) => ({ ...ticket, id: nanoid() })),
			stop: ticketsData.stop,
			searchId,
		};
	} catch (err) {
		const result = await fetchThunk(searchId);
		return result;
	}
});
