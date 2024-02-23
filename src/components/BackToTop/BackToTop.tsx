import React, { useState, useEffect } from 'react';
import { RxPinTop } from 'react-icons/rx';

const BackToTopButton: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsVisible(window.scrollY > 100);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<button
			className={`fixed bottom-4 right-4 bg-gradient-to-r from-sky-700 to-sky-500
            hover:from-sky-600 hover:to-sky-400 text-white px-4 py-2 rounded-xl ${
							isVisible ? 'visible' : 'invisible'
						}`}
			onClick={scrollToTop}
		>
			<RxPinTop />
		</button>
	);
};

export default BackToTopButton;
