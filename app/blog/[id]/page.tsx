import { getPostData, getSortedPostsData } from '@/lib/posts'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () => {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    id: post.slug,
  }))
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  let post
  try {
    post = await getPostData(id)
  } catch (e) {
    notFound()
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{post.Title}</h1>
          <p className="text-gray-600 dark:text-gray-400">{post.Description}</p>
        </header>

        {post.contentHtml && (
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        )}
      </article>
    </main>
  )
}

export default Page
