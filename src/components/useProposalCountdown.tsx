import {useEffect, useState} from 'react';

type Countdown = {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	isExpired: boolean;
};

function calculateCountdown(target: Date, now: Date): Countdown {
	const diff = target.getTime() - now.getTime();

	if (diff <= 0) {
		return {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			isExpired: true,
		};
	}

	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
	const minutes = Math.floor((diff / (1000 * 60)) % 60);
	const seconds = Math.floor((diff / 1000) % 60);

	return {
		days,
		hours,
		minutes,
		seconds,
		isExpired: false,
	};
}

export function useCountdown(
	targetDate: Date,
	currentDate?: Date, // optional for testing
) {
	const [now, setNow] = useState(currentDate ?? new Date());

	useEffect(() => {
		if (currentDate) return; // if testing, don't auto update

		const interval = setInterval(() => {
			setNow(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, [currentDate]);

	return calculateCountdown(targetDate, now);
}
