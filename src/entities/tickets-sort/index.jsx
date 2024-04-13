import { useDispatch, useSelector } from "react-redux";

import { updateSortMode } from "../../shared/store/slices/tickets";

export function TicketsSort() {
	const { sortMode } = useSelector((state) => state.tickets);
	const dispatch = useDispatch();
	const handleOnClick = (mode) => () => dispatch(updateSortMode(mode));

	return (
		<div className="main__tickets-sort">
			<button
				type="button"
				onClick={handleOnClick("cheap")}
				className={`main__tickets-sort__button ${sortMode === "cheap" ? "active" : ""}`}
			>
				Самый дешевый
			</button>
			<button
				type="button"
				onClick={handleOnClick("quik")}
				className={`main__tickets-sort__button ${sortMode === "quik" ? "active" : ""}`}
			>
				Самый быстрый
			</button>
			<button
				type="button"
				onClick={handleOnClick("optimal")}
				className={`main__tickets-sort__button ${sortMode === "optimal" ? "active" : ""}`}
			>
				Оптимальный
			</button>
		</div>
	);
}
