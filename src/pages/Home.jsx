import { useEffect, useRef, useState, useCallback } from "react";
import PostCard from "../components/PostCard";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";

const API_URL =
  "https://blog.apiki.com/wp-json/wp/v2/posts?_embed&categories=518";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const newPostRef = useRef(null);

  const debounceTimer = useRef(null);

  const debouncedLoadPosts = useCallback((pageToLoad) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(`${API_URL}&page=${pageToLoad}`);
      const data = await res.json();
      const total = res.headers.get("X-WP-TotalPages");
      setTotalPages(Number(total));

      setPosts((prev) => (pageToLoad === 1 ? data : [...prev, ...data]));
      setPage(pageToLoad);
      setLoading(false);

      if (pageToLoad > 1) {
        setTimeout(() => {
          newPostRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }, 300);
    return () => clearTimeout(debounceTimer.current);
  }, []);

  useEffect(() => {
    debouncedLoadPosts(1);
  }, [debouncedLoadPosts]);

  const loadPosts = (pageToLoad) => {
    debouncedLoadPosts(pageToLoad);
  };

  return (
    <main className="px-4 py-10 max-w-7xl mx-auto">
      <Helmet>
        <title>Blog Devs | Apiki</title>
        <meta
          name="description"
          content="Últimas postagens da categoria Desenvolvimento no blog da Apiki."
        />
      </Helmet>
      <header className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-4 animate-fade-in">
          Blog para Devs
        </h1>
        <p className="text-xl text-gray-600 animate-fade-in delay-100">
          Artigos técnicos, novidades e insights sobre desenvolvimento.
        </p>
      </header>
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="animate-fade-in-up delay-[${index * 100}ms]"
            ref={index === posts.length - 10 ? newPostRef : null}
          >
            <PostCard post={post} />
          </div>
        ))}
      </section>
      {loading && <Loading />}
      {page < totalPages && !loading && (
        <div className="text-center mt-10 animate-fade-in">
          <button
            className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
            onClick={() => loadPosts(page + 1)}
          >
            Carregar mais...
          </button>
        </div>
      )}
    </main>
  );
}
