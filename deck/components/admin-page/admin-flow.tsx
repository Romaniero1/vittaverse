'use client';

import { SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export const AdminFlow = () => {
	const apiKey = process.env.API_KEY;
	const authToken = process.env.AUTH_TOKEN;
	const headers = new Headers();
	headers.set('apikey', apiKey || '');
	headers.set('Authorization', authToken || '');
	headers.set('Content-Type', 'application/json');
	headers.set('Prefer', 'return=minimal');
	const router = useRouter();
	if (typeof window !== 'undefined') {
		const isPasswordCorrect = localStorage.getItem('isPasswordCorrect');
		isPasswordCorrect === 'true' ? null : router.push('/');
	}
	const [pass, setPassword] = useState('');
	const [firm, setFirm] = useState('');
	const handlePasswordChange = (event: { target: { value: SetStateAction<string>; }; }) => {
		setPassword(event.target.value);
	};
	const handleFirmChange = (event: { target: { value: SetStateAction<string>; }; }) => {
		setFirm(event.target.value);
	};


	const onSubmit = async (event: { preventDefault: () => void; }) => {
		event.preventDefault();
		if (!pass) {
			toast.error('Fill in the input field!');
			return;
		}

		const response = await fetch('https://uyhpwyrhafadrvtsnwis.supabase.co/rest/v1/Vittaverse', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({ firm, pass }),
		});
		if (response.ok) {
			toast.success('Company added!');
			setPassword('');
			setFirm('');
		} else {
			toast.error('Error!');
		}
	};


	return (
		<header className="flex justify-center items-center w-screen h-screen overflow-hidden bg-[#080000] bg-cover">
			<div className='mx-10 flex flex-col items-center '>
				<form onSubmit={onSubmit} className="flex flex-col items-center">
					<input
						value={firm}
						onChange={handleFirmChange}
						className='w-[280px] sm:w-[380px]  h-[60px] rounded-[10px] px-5 text-black bg-white bg-no-repeat bg-cover focus:outline-none'
						placeholder='Company name'
					/>
					<input
						value={pass}
						onChange={handlePasswordChange}
						className='w-[280px] sm:w-[380px]  h-[60px] rounded-[10px] px-5 text-black bg-white bg-no-repeat bg-cover focus:outline-none mt-2'
						placeholder='Password'
					/>
					<button
						type='submit'
						className='outline outline-0 w-[280px] sm:w-[380px]  h-[60px] mt-2 rounded-[8px] bg-green text-white hover:bg-darkGreen'
					>
						<h2>Add company</h2>
					</button>
				</form>
			</div>
		</header>
	);
}