import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; // 👈 importa esto

function Home() {
  const [content, setContent] = useState("");
  const [currentFile, setCurrentFile] = useState("/z.doc/1.Index.md");

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(currentFile);
        if (!response.ok) throw new Error("Error cargando el markdown");
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMarkdown();
  }, [currentFile]);

  const handleLinkClick = (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (href && href.endsWith(".md")) {
      e.preventDefault();
      const cleanPath = href.replace("./", "/z.doc/");
      setCurrentFile(cleanPath);
    }
  };

  return (
    <main
      style={{
        maxWidth: "850px",
        margin: "50px auto",
        padding: "25px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.7",
      }}
      onClick={handleLinkClick}
    >
      {currentFile !== "/z.doc/1.Index.md" && (
        <button
          onClick={() => setCurrentFile("/z.doc/1.Index.md")}
          style={{
            marginBottom: "20px",
            cursor: "pointer",
            padding: "6px 12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            backgroundColor: "#f6f8fa",
          }}
        >
          ← Volver al índice
        </button>
      )}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]} // 👈 permite HTML dentro del Markdown
      >
        {content}
      </ReactMarkdown>
    </main>
  );
}

export default Home;
