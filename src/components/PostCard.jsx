import { Link } from "react-router";

export default function PostCard({ post, innerRef }) {
  const imageUrl = post._embedded["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <article
      ref={innerRef}
      className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow duration-300 border border-gray-200"
    >
      <Link
        to={`/post/${post.slug}`}
        className="absolute inset-0"
        aria-label={`Leia mais: ${post.title.rendered}`}
      />

      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.title.rendered}
          className="w-full h-52 object-cover transition-transform duration-300"
        />
      )}
      <div className="p-5">
        <h2
          className="text-xl font-semibold text-gray-800 mb-2 leading-snug line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <div
          className="text-gray-600 text-sm mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />

        <Link
          to={`/post/${post.slug}`}
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Ler mais →
        </Link>
      </div>
    </article>
  );
}
