import {motion} from 'motion/react';

type PoemBlockProps = {
	text: string;
	className?: string;
};

export function renderPoemVerses(text: string) {
	const lines = text
		.split('\n')
		.map((line) => line.trim())
		.filter(Boolean);

	const verses: string[][] = [];

	for (let i = 0; i < lines.length; i += 2) {
		verses.push([lines[i], lines[i + 1]]);
	}

	return (
		<motion.div
			className="glass p-5 flex-col"
			initial={{opacity: 0, y: 20}}
			animate={{opacity: 1, y: 0}}
			transition={{duration: 0.8, delay: 2, ease: 'easeIn'}}
		>
			{verses.map(([sadr, ajz], index) => (
				<motion.div
					key={index}
					className="space-y-1 text-center"
					initial={{opacity: 0, y: 20}}
					animate={{opacity: 1, y: 0}}
					transition={{duration: 0.8, delay: 2 + index * 0.2, ease: 'easeIn'}}
				>
					<p>{sadr}</p>
					{ajz && <p>{ajz}</p>}
				</motion.div>
			))}
		</motion.div>
	);
}

export function PoemBlock({text, className = ''}: PoemBlockProps) {
	return (
		<div dir="rtl" className={`space-y-4 ${className}`}>
			{renderPoemVerses(text)}
		</div>
	);
}
