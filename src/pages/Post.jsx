import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const debounceTimer = useRef(null);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetch(`https://blog.apiki.com/wp-json/wp/v2/posts?_embed&slug=${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) setPost(data[0]);
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(debounceTimer.current);
  }, [slug]);

  if (loading) return <Loading centered />;
  if (!post) return <p className="p-4">Post não encontrado.</p>;

  const imageUrl = post._embedded["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <article className="max-w-3xl mx-auto px-4 py-10 bg-white rounded-lg animate-fade-in">
      <Helmet>
        <title>{post.title.rendered} | Blog Devs</title>
        <meta
          name="description"
          content={post.excerpt.rendered.replace(/<[^>]+>/g, "")}
        />
      </Helmet>

      <h1
        className="text-2xl font-bold text-blue-900 mb-4"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <div
        className="text-gray-600 mb-6"
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />

      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.title.rendered}
          className="mb-8 rounded-md w-full max-h-[400px] object-cover"
        />
      )}

      <div
        className="prose prose-lg max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
