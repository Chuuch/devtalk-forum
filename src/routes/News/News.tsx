import BackToTopButton from '../../components/BackToTop/BackToTop';
import DeveloperNews from '../../components/DeveloperNews/DeveloperNews';

interface Props {}

const News: React.FC<Props> = () => {
	return (
		<div className="flex flex-col items-center justify-center scrollbar scrollbar-track-slate-500">
			<DeveloperNews />
			<BackToTopButton />
		</div>
	);
};
export default News;
