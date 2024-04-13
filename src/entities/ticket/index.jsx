import { add } from "date-fns";

import S7Logo from "../../shared/assets/s7-logo.png";

export function Ticket({ ticket }) {
	const convertTime = (minutes) => {
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;

		return `${hours}ч ${remainingMinutes}м`;
	};
	const formatTime = (val) => (val < 10 ? `0${val}` : String(val));

	return (
		<article className="main__tickets-list__item">
			<header className="main__tickets-list__item-header">
				<div className="main__tickets-list__item-price">{ticket.price} Р</div>
				<div className="main__tickets-list__item-logo">
					<img src={S7Logo} alt="" />
				</div>
			</header>
			<section className="main__tickets-list__item-info">
				{ticket.segments.map((segment) => {
					const originDate = new Date(segment.date);
					const date = add(new Date(segment.date), {
						minutes: segment.duration,
					});

					return (
						<div key={segment.origin} className="main__tickets-list__item-info__row">
							<div className="main__tickets-list__item-info__item">
								<div className="main__tickets-list__item-info__suptitle">
									{segment.origin} - {segment.destination}
								</div>
								<div className="main__tickets-list__item-info__text">
									{formatTime(originDate.getHours())}:{formatTime(originDate.getMinutes())} -{" "}
									{formatTime(date.getHours())}:{formatTime(date.getMinutes())}
								</div>
							</div>
							<div className="main__tickets-list__item-info__item">
								<div className="main__tickets-list__item-info__suptitle">В пути</div>
								<div className="main__tickets-list__item-info__text">{convertTime(segment.duration)}</div>
							</div>
							{segment.stops.length ? (
								<div className="main__tickets-list__item-info__item">
									<div className="main__tickets-list__item-info__suptitle">{segment.stops.length} Пересадки</div>
									<div className="main__tickets-list__item-info__text">
										{segment.stops.map((token) => token).join(", ")}
									</div>
								</div>
							) : null}
						</div>
					);
				})}
			</section>
		</article>
	);
}
