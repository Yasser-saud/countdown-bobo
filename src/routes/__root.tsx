import {HeadContent, Scripts, createRootRoute} from '@tanstack/react-router';
import {TanStackRouterDevtoolsPanel} from '@tanstack/react-router-devtools';
import {TanStackDevtools} from '@tanstack/react-devtools';

import appCss from '../styles.css?url';

const THEME_INIT_SCRIPT = `(function(){try{var root=document.documentElement;root.classList.add('dark');root.setAttribute('data-theme','dark');root.style.colorScheme='dark';window.localStorage.setItem('theme','dark');}catch(e){}})();`;

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				title: '❤️ بشاير ❤️',
			},
		],
		links: [
			{
				rel: 'stylesheet',
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" className="dark" dir="rtl" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{__html: THEME_INIT_SCRIPT}} />
				<HeadContent />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Playpen+Sans+Arabic:wght@100..800&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className="font-sans antialiased [overflow-wrap:anywhere]">
				{children}

				<TanStackDevtools
					config={{
						position: 'bottom-right',
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
