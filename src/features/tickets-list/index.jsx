import { useSelector } from "react-redux";
import { Spin } from "antd";

import { Ticket } from "../../entities/ticket";
import { TicketsLoad } from "../../entities/tickets-load";
import { TicketsSort } from "../../entities/tickets-sort";
import "./index.css";

export function TicketsList() {
	const { tickets, isLoading, visibleItems, all, oneSegments, twoSegments, threeSegments, noSegments, sortMode } =
		useSelector((state) => state.tickets);
	const getTickets = () => {
		const filterStrategy = (ticket) => {
			if ((!all && !oneSegments && !twoSegments && !threeSegments && !noSegments) || all) return true;

			const stops = ticket.segments.map((segment) => segment.stops.length).reduce((acc, cur) => acc + cur, 0);

			if (
				(stops === 1 && oneSegments) ||
				(stops === 2 && twoSegments) ||
				(stops === 3 && threeSegments) ||
				(stops === 0 && noSegments)
			)
				return true;

			return false;
		};

		const sortStrategy = (a, b) => {
			if (sortMode === "cheap") return a.price - b.price;
			if (sortMode === "quick") return a.duration - b.duration;
			if (sortMode === "optimal") {
				const priceDiff = a.price - b.price;

				if (priceDiff) return priceDiff;

				return a.duration - b.duration;
			}

			return 0;
		};

		const visibleTickets = [];

		for (let i = 0; i < tickets.length && visibleItems < tickets.length && visibleTickets.length < visibleItems; i++) {
			const ticket = tickets[i];

			if (filterStrategy(ticket)) visibleTickets.push(ticket);
		}

		visibleTickets.sort(sortStrategy);

		return visibleTickets;
	};

	return (
		<section className="main__tickets">
			{isLoading ? (
				<Spin className="loader" />
			) : (
				<>
					<TicketsSort />
					<div className="main__tickets-list">
						{getTickets().map((ticket) => (
							<Ticket key={ticket.id} ticket={ticket} />
						))}
						{visibleItems < tickets.length && <TicketsLoad />}
					</div>
				</>
			)}
		</section>
	);
}
