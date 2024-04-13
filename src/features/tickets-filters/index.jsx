import { useDispatch, useSelector } from "react-redux";

import { updateFilters } from "../../shared/store/slices/tickets";
import CheckMark from "../../shared/assets/check.png";
import "./index.css";

export function TicketsFilters() {
	const dispatch = useDispatch();
	const { all, oneSegments, noSegments, twoSegments, threeSegments } = useSelector((state) => state.tickets);

	const handleOnChange = (key, value) => () => dispatch(updateFilters({ key, value }));

	return (
		<fieldset className="main__filter">
			<div className="main__filter-legend">Количество пересадок</div>
			<div className="main__filter-column">
				<p className="main__filter-field">
					<label>
						<input type="checkbox" onChange={handleOnChange("all", !all)} value={all} checked={all} />
						<span>
							<img src={CheckMark} alt="" />
						</span>
						Все
					</label>
				</p>
				<p className="main__filter-field">
					<label>
						<input
							type="checkbox"
							onChange={handleOnChange("noSegments", !noSegments)}
							value={noSegments}
							checked={noSegments}
						/>
						<span>
							<img src={CheckMark} alt="" />
						</span>{" "}
						Без пересадок
					</label>
				</p>
				<p className="main__filter-field">
					<label>
						<input
							type="checkbox"
							onChange={handleOnChange("oneSegments", !oneSegments)}
							value={oneSegments}
							checked={oneSegments}
						/>
						<span>
							<img src={CheckMark} alt="" />
						</span>{" "}
						1 пересадка
					</label>
				</p>
				<p className="main__filter-field">
					<label>
						<input
							type="checkbox"
							onChange={handleOnChange("twoSegments", !twoSegments)}
							value={twoSegments}
							checked={twoSegments}
						/>
						<span>
							<img src={CheckMark} alt="" />
						</span>{" "}
						2 пересадки
					</label>
				</p>
				<p className="main__filter-field">
					<label>
						<input
							type="checkbox"
							onChange={handleOnChange("threeSegments", !threeSegments)}
							value={threeSegments}
							checked={threeSegments}
						/>
						<span>
							<img src={CheckMark} alt="" />
						</span>{" "}
						3 пересадки
					</label>
				</p>
			</div>
		</fieldset>
	);
}
