import {useMemo, useState} from 'react';
import {Clock1, Clock2, Clock3, Clock4} from 'lucide-react';
import {motion} from 'framer-motion';
import {Particles} from '@/components/ui/particles';
import {Spotlight} from '@/components/ui/spotlight';
import {cn} from '@/lib/utils';
import {useCountdown} from './useProposalCountdown';
import NumberFlow from '@number-flow/react';
import {PoemBlock} from './PoemBlock';
import {poems} from './poems';

export default function WaitlistPage() {
	const now = new Date();
	const targetDate = new Date('2026-03-25T00:00:00');

	const {days, hours, minutes, seconds, isExpired} = useCountdown(targetDate);

	const renderCountdown = [
		{
			label: 'يوم',
			value: days,
		},
		{
			label: 'ساعة',
			value: hours,
		},
		{
			label: 'دقيقة',
			value: minutes,
		},
		{
			label: 'ثانية',
			value: seconds,
		},
	];

	function getPoemIndex(poemsLength: number, targetDate: Date, now: Date) {
		const msPerDay = 1000 * 60 * 60 * 24;

		const daysLeft = Math.ceil((targetDate.getTime() - now.getTime()) / msPerDay);

		// 12 poems:
		// 12 days left => index 0
		// 11 days left => index 1
		// ...
		// 1 day left => index 11
		const index = poemsLength - daysLeft;

		return Math.max(0, Math.min(index, poemsLength - 1));
	}

	const poemIndex = useMemo(
		() => getPoemIndex(poems.length, targetDate, now),
		[poems.length, targetDate, now],
	);

	const currentPoem = poems[poemIndex];
	return (
		<main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden xl:h-screen">
			<Spotlight />

			<Particles
				className="absolute inset-0 z-0"
				quantity={100}
				ease={80}
				refresh
				color="#ffffff"
			/>

			<div className="relative z-[100] mx-auto w-full px-4 py-16 text-center">
				<motion.h1
					initial={{opacity: 0, y: 20}}
					animate={{opacity: 1, y: 0}}
					transition={{duration: 0.6, delay: 0.2}}
					className={cn(
						'sticky top-0 from-foreground via-foreground/80 to-foreground/40 mb-6 cursor-crosshair bg-linear-to-b bg-clip-text text-3xl font-medium text-transparent sm:text-7xl',
					)}
				>
					<span className="bg-secondary from-primary to-secondary/50 via-primary bg-clip-text text-transparent dark:bg-linear-to-b">
						بشاير
					</span>
				</motion.h1>
				{/* <motion.div
					initial={{opacity: 0, y: 20}}
					animate={{opacity: 1, y: 0}}
					transition={{duration: 0.6, delay: 0.4, type: 'spring'}}
					className="w-full  grid grid-cols-4  sm:grid-cols-4 border border-primary/10 rounded-xl overflow-hidden"
				>
					{renderCountdown.map((item, i) => (
						<>
							<motion.div
								key={i}
								initial={{scale: 0, x: -50}}
								animate={{scale: 1, x: 0}}
								transition={{duration: 0.2, delay: 1 + i * 0.1, type: 'spring'}}
								className={cn(
									'border-primary/10 flex flex-col items-center justify-center rounded-none! border-none! bg-white/5 p-4 backdrop-blur-md',
									'glass',
								)}
							>
								{i === 0 && <Clock1 className="text-primary/50 mb-2 size-4" />}
								{i === 1 && <Clock2 className="text-primary/50 mb-2 size-4" />}
								{i === 2 && <Clock3 className="text-primary/50 mb-2 size-4" />}
								{i === 3 && <Clock4 className="text-primary/50 mb-2 size-4" />}

								<span className="text-lg ">
									<NumberFlow
										value={item.value}
										transformTiming={{
											duration: 850,
											easing: 'linear(0, 0.0017 0.46%, 0.0079, 0.0183, 0.0325 2.14%, 0.0711 3.25%, 0.13 4.56%, 0.255 6.79%, 0.5498 11.43%, 0.6727 13.48%, 0.7876 15.62%, 0.8815, 0.9582, 1.0179 21.75%, 1.0415 22.78%, 1.063, 1.0801, 1.0932 26.12%, 1.1051 27.61%, 1.1117 29.19%, 1.1129 30.86%, 1.1088 32.72%, 1.1025 34.21%, 1.0929 35.88%, 1.0402 43.41%, 1.0171 47.32%, 1.0073 49.46%, 0.9994, 0.9937 53.92%, 0.9898 56.24%, 0.9876 59.03%, 0.9874 62.19%, 1 81.81%, 1.0014 89.24%, 1.0009 99.93%)',
										}}
									/>
								</span>
								<span className="text-muted-foreground text-xs">{item.label}</span>
								{i !== renderCountdown.length && (
									<div className="absolute right-0 top-1/2 -translate-y-1/2 h-[calc(100%-2rem)] w-px bg-primary/10" />
								)}
							</motion.div>
						</>
					))}
				</motion.div> */}

				<div className="mt-8">
					{/* <PoemBlock text={currentPoem} className="" /> */}
					{poems.map((poem, i) => (
						<PoemBlock key={i} text={poem} className="my-10" />
					))}
				</div>
			</div>
		</main>
	);
}
