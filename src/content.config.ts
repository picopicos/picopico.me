import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const postsCollection = defineCollection({
	loader: glob({
		pattern: ["**/*.md", "**/*.mdx"],
		base: "./src/content/posts",
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			published: z.coerce.date(),
			// updated: z.coerce.date().optional(),
			draft: z.boolean().optional().default(false),
			description: z.string().optional(),
			author: z.string().optional(),
			tags: z.array(z.string()).optional().default([]),
			coverImage: z
				.strictObject({
					src: image(),
					alt: z.string(),
				})
				.optional(),
		}),
});

const homeCollection = defineCollection({
	loader: glob({
		pattern: ["home.md", "home.mdx", "main/*.md", "main/*.mdx"],
		base: "./src/content",
	}),
	schema: ({ image }) =>
		z.object({
			avatarImage: z
				.object({
					src: image(),
					alt: z.string().optional().default("My avatar"),
				})
				.optional(),
			githubCalendar: z.string().optional(), // GitHub username for calendar
		}),
});

const addendumCollection = defineCollection({
	loader: glob({
		pattern: ["addendum.md", "addendum.mdx"],
		base: "./src/content",
	}),
	schema: ({ image }) =>
		z.object({
			avatarImage: z
				.object({
					src: image(),
					alt: z.string().optional().default("My avatar"),
				})
				.optional(),
		}),
});

const worksCollection = defineCollection({
	loader: glob({
		pattern: ["works.md", "works.mdx"],
		base: "./src/content",
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
		}),
});

export const collections = {
	posts: postsCollection,
	home: homeCollection,
	addendum: addendumCollection,
	works: worksCollection,
};
