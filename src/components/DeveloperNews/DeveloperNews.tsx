import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, CardContent } from '../ui/card';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '../../components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Link } from 'react-router-dom';

interface DevNewsProps {
	title: string;
	description: string;
	url: string;
	source: {
		name: string;
	};
	author: string;
	urlToImage: string;
	publishedAt: string;
	content: string;
}

const DeveloperNews: React.FC = () => {
	const [developerNews, setDeveloperNews] = useState<DevNewsProps[]>([]);
	const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
	const apiKey = import.meta.env.VITE_NEWS_API;

	useEffect(() => {
		const fetchDeveloperNews = async () => {
			try {
				const response = await axios.get(
					`https://newsapi.org/v2/everything?q=software&development&apiKey=${apiKey}`
				);

				if (response.status === 200) {
					setDeveloperNews(response.data.articles);
				} else {
					console.error('Failed to fetch developer news');
				}
			} catch (error) {
				console.error('Error fetching developer news', error);
			}
		};
		fetchDeveloperNews();
	}, [apiKey]);

	return (
		<div className="">
			<h2 className="flex flex-col w-full items-center justify-center font-light text-gray-400 tracking-widest mt-16 text-5xl">
				Developer News
			</h2>
			<div className="flex items-center justify-center mt-20 w-[540px]">
				<Carousel
					plugins={[plugin.current]}
					className=" flex items-center justify-center w-full hover:scale-105 transition"
					onMouseEnter={plugin.current.stop}
					onMouseLeave={plugin.current.reset}
				>
					<CarouselContent className="flex items-center justify-center w-full gap-x-2">
						{developerNews
							.filter((article) => article.urlToImage)
							.map((article, index) => (
								<CarouselItem key={index} className="">
									<div className="">
										<Link to={article.url}>
											<Card className="flex rounded-lg cursor-pointer border-none text-gray-400 bg-gray-800 w-[540px] h-96">
												<CardContent className="flex flex-col items-start justify-start p-6">
													<strong>
														<h1>{article.source.name}</h1>
													</strong>
													<p>{article.title}</p>
													<img
														src={article.urlToImage}
														alt="article_image"
														className="rounded-lg w-[540px] h-full object-cover"
													/>
												</CardContent>
											</Card>
										</Link>
									</div>
								</CarouselItem>
							))}
					</CarouselContent>
					<CarouselPrevious className="text-sky-700 bg-transparent transition" />
					<CarouselNext className="text-sky-700 bg-transparent" />
				</Carousel>
			</div>
		</div>
	);
};

export default DeveloperNews;
