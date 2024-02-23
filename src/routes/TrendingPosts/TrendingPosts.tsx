import React from 'react';

interface Props {}

const TrendingPosts: React.FC<Props> = () => {
	return (
		<div className="flex flex-col items-center justify-center mt-16 font-light text-5xl text-gray-400 tracking-widest">
			Trending Posts
		</div>
	);
};

export default TrendingPosts;
