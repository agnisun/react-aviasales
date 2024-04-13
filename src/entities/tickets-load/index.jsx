import { useDispatch, useSelector } from "react-redux";

import { updateVisibleItems } from "../../shared/store/slices/tickets";

export function TicketsLoad() {
	const { visibleItems, tickets } = useSelector((state) => state.tickets);
	const dispatch = useDispatch();

	const handleOnClick = () => {
		dispatch(updateVisibleItems());
	};

	return (
		tickets.length > visibleItems && (
			<button type="button" onClick={handleOnClick} className="main__tickets-load">
				Показать еще {tickets.length - visibleItems > 5 ? 5 : tickets.length - visibleItems} билетов!
			</button>
		)
	);
}
