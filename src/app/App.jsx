import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTickets } from "../shared/store/slices/tickets/thunk";
import { TicketsList } from "../features/tickets-list";
import { TicketsFilters } from "../features/tickets-filters";
import Logo from "../shared/assets/logo.png";
import "modern-normalize";
import "./styles/index.css";

export function App() {
	const dispatch = useDispatch();
	const { stop, searchId, tickets } = useSelector((state) => state.tickets);

	useEffect(() => {
		if (!stop) dispatch(fetchTickets(searchId));
	}, [tickets]);

	return (
		<div className="container">
			<header className="header">
				<div className="header__icon">
					<img src={Logo} alt="" />
				</div>
			</header>
			<main className="main">
				<TicketsFilters />
				<TicketsList />
			</main>
		</div>
	);
}
