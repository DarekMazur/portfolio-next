import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts/content/blog')

export interface PostFrontmatter {
  Title: string
  Description: string
  Category: string
  Tags: string[]
  Cover?: string
  slug?: string
}

export interface PostData extends PostFrontmatter {
  slug: string
  _fileName: string
  contentHtml?: string
}

export const createSlug = (text?: string): string => {
  if (!text) return 'untitled-post'

  return text
    .toString()
    .replace(/ł/g, 'l')
    .replace(/Ł/g, 'L')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '') // Zmieniamy: usuwamy wszystko, co NIE jest literą, cyfrą lub SPACJĄ
    .trim()
    .replace(/\s+/g, '-') // Zamieniamy dowolną liczbę spacji na jeden myślnik
    .replace(/-+/g, '-') // DODAJ TO: redukuje serię myślników (np. ---) do jednego (-)
    .replace(/^-+|-+$/g, '') // Usuwa myślniki z początku i końca (opcjonalnie)
}

export const getSortedPostsData = (): PostData[] => {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      const frontmatter = data as PostFrontmatter

      const finalSlug =
        frontmatter.slug || createSlug(frontmatter.Title || 'untitled')

      return {
        ...frontmatter,
        slug: finalSlug,
        _fileName: fileName,
      }
    })
}

export const getPostData = async (slug: string): Promise<PostData> => {
  const allPosts = getSortedPostsData()
  const matchedPost = allPosts.find((p) => p.slug === slug)

  if (!matchedPost) {
    throw new Error(`Nie znaleziono posta dla sluga: ${slug}`)
  }

  const fullPath = path.join(postsDirectory, matchedPost._fileName)

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Plik nie istnieje pod ścieżką: ${fullPath}`)
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContents)
  const processedContent = await remark().use(html).process(content)

  return {
    ...(data as PostFrontmatter),
    slug,
    _fileName: matchedPost._fileName,
    contentHtml: processedContent.toString(),
  }
}
