import { useState } from 'react';
import { ImSearch } from 'react-icons/im';

const SearchBar = () => {
	const [showSearchBar, setShowSearchBar] = useState(false);

	const handleSearchIconClick = () => {
		setShowSearchBar(!showSearchBar);
	};

	return (
		<div className="flex flex-row justify-center items-center">
			<div
				onClick={handleSearchIconClick}
				className="flex place-self-center cursor-pointer hover:bg-gray-800 opacity-75 rounded-full self-center w-10 h-10 z-1"
			>
				<ImSearch size={20} className="cursor-pointer mx-auto my-auto" />
			</div>
			{showSearchBar && (
				<>
					<div className="flex flex-row p-2 gap-x-2">
						<input
							type="text"
							className="rounded-xl bg-gray-700 p-0.5 px-2 outline-none border-none focus:outline-sky-500"
							placeholder="Search"
							required
						/>
						<button className="bg-gradient-to-r from-sky-700 to-sky-500 hover:from-sky-600 hover:to-sky-400 rounded-full px-5 flex items-center justify-center">
							Search
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default SearchBar;
