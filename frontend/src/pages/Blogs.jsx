import Seo from "../components/Seo";
import { Link } from "react-router-dom";
import blogs from "../data/blogs";

function BlogCard({ blog }) {
  return (
    <Link
      to={`/blogs/${blog.slug}`}
      className="no-underline flex flex-col rounded-[20px] border border-[rgba(1,49,134,0.12)] [background:linear-gradient(180deg,_#f5f9ff,_#e6f0ff)] p-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(1,49,134,0.14)]"
    >
      {/* Cover */}
      <div className="rounded-[14px] bg-white border border-[rgba(1,49,134,0.08)] h-[230px] flex items-center justify-center text-center px-6 overflow-hidden">
        <span className="text-[#013186] font-bold leading-snug" style={{ fontSize: "clamp(16px, 1.5vw, 22px)" }}>
          {blog.cover}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-[#013186] font-bold mt-6 mb-3 leading-snug" style={{ fontSize: "clamp(18px, 1.6vw, 22px)" }}>
        {blog.title}
      </h3>

      {/* Excerpt */}
      <p className="m-0 mb-6 text-[15px] leading-relaxed text-[rgba(0,0,0,0.5)] font-medium">
        {blog.excerpt}
      </p>

      {/* Read More */}
      <span className="mt-auto inline-flex w-fit items-center bg-[#013186] text-white font-bold text-[15px] rounded-[10px] px-6 py-3">
        Read More
      </span>
    </Link>
  );
}

export default function Blogs() {
  return (
    <div className="w-full font-[Montserrat] overflow-x-hidden">
      <Seo path="/blogs" title="Blog — Social Media Marketing Tips | The Social 99" description="Actionable social media marketing tips, content strategy, and growth insights for small businesses from The Social 99." />
      {/* Hero */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pt-16 mq450:pt-10 pb-10 text-center">
        <h1 className="text-[#013186] font-bold leading-tight m-0" style={{ fontSize: "clamp(38px, 7vw, 92px)" }}>
          Insights that Shape Execution
        </h1>
        <p className="mt-4 mx-auto max-w-[1000px] text-[rgba(0,0,0,0.5)] font-semibold" style={{ fontSize: "clamp(15px, 1.6vw, 22px)" }}>
          Our blog shares structured perspectives on digital work, content systems, and brand consistency. Each article is written to clarify how strong execution is built, not improvised.
        </p>
      </div>

      {/* Grid: 3 per row, collapses on smaller screens */}
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pb-20">
        <div className="grid grid-cols-3 gap-8 mq1125:grid-cols-2 mq450:grid-cols-1 w-full max-w-[1500px] mx-auto">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}
