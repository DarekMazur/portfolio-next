import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface PostFrontmatter {
	title: string;
	description: string;
	category: string;
	tags: string[];
	cover?: string;
}

export interface PostData extends PostFrontmatter {
	slug: string;
	contentHtml?: string;
}

export const getSortedPostsData = (): PostData[] => {
	const fileNames = fs.readdirSync(postsDirectory);

	return fileNames.map((fileName) => {
		const slug = fileName.replace(/\.md$/, '');
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const { data } = matter(fileContents);

		return {
			slug,
			...(data as PostFrontmatter),
		};
	});
};

export const getPostData = async (slug: string): Promise<PostData> => {
	const fullPath = path.join(postsDirectory, `${slug}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	const { data, content } = matter(fileContents);

	const processedContent = await remark()
		.use(html)
		.process(content);

	const contentHtml = processedContent.toString();

	return {
		slug,
		contentHtml,
		...(data as PostFrontmatter),
	};
};