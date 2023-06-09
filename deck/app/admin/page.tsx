import { AdminFlow } from '@/components/admin-page';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

export default function Deck() {

	return (
		<div className='text-white overflow-x-hidden'>
			<Head>
				<title>Vittaverse</title>
				<meta name='description' content='Vittaverse' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Toaster position='bottom-right' />
			<main>
				<AdminFlow />
			</main>
		</div>
	);
}
