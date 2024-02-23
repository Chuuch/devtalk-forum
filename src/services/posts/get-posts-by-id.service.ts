import { getAllPosts } from './get-all-posts.service';

export const getPostsById = async (id: string) => {
	const posts = await getAllPosts();
	return posts.filter((p) => id.includes(p.id));
};
