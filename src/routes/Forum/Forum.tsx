import SinglePost from '../../components/SinglePost/SinglePost';

interface Props {}

const Forum: React.FC<Props> = () => {
	return (
		<div className="flex flex-col items-center justify-center mt-16 font-light text-5xl text-gray-400 tracking-widest">
			<h1>Forum</h1>
			<div className="mt-16">
				<SinglePost />
			</div>
		</div>
	);
};

export default Forum;
