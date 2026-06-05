import { useParams, Link } from "react-router-dom";
import blogs from "../data/blogs";
import RealROI99 from "./articles/RealROI99";
import InvisibleSocial2026 from "./articles/InvisibleSocial2026";
import PsychologyBuy from "./articles/PsychologyBuy";
import ZeroTo1000 from "./articles/ZeroTo1000";
import WhenToPost from "./articles/WhenToPost";

// Slugs that have a fully custom-designed article component
const customArticles = {
  "real-roi-99-social-media-management": RealROI99,
  "small-business-invisible-social-media-2026": InvisibleSocial2026,
  "psychology-customers-buy-businesses-they-follow": PsychologyBuy,
  "from-zero-to-1000-followers-the-small-business-playbook-for-2026": ZeroTo1000,
  "when-to-post-how-to-batch-and-how-to-schedule-30-days-of-social-media-in-one-sitting": WhenToPost,
};

export default function BlogDetail() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  const CustomArticle = customArticles[slug];
  if (CustomArticle) return <CustomArticle />;

  if (!blog) {
    return (
      <div className="w-full font-[Montserrat] px-[100px] mq800:px-10 mq450:px-5 py-24 text-center">
        <h1 className="text-[#013186] font-bold text-[40px] mq450:text-[28px] m-0 mb-6">Blog not found</h1>
        <Link to="/blogs" className="text-[#013186] font-bold no-underline">← Back to all blogs</Link>
      </div>
    );
  }

  return (
    <div className="w-full font-[Montserrat] overflow-x-hidden">
      <div className="w-full px-[100px] mq800:px-10 mq450:px-5 pt-14 mq450:pt-10 pb-20">
        <div className="w-full max-w-[900px] mx-auto">

          <Link to="/blogs" className="inline-flex items-center gap-2 text-[#013186] font-semibold text-[15px] no-underline mb-8 hover:underline">
            ← Back to all blogs
          </Link>

          {/* Cover */}
          <div className="rounded-[18px] bg-white border border-[rgba(1,49,134,0.10)] [background:linear-gradient(180deg,_#f5f9ff,_#e6f0ff)] min-h-[260px] flex items-center justify-center text-center px-10 py-12 mb-10">
            <span className="text-[#013186] font-bold leading-snug" style={{ fontSize: "clamp(22px, 3vw, 38px)" }}>
              {blog.cover}
            </span>
          </div>

          <h1 className="text-[#013186] font-bold leading-tight m-0 mb-8" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
            {blog.title}
          </h1>

          <div className="flex flex-col gap-5">
            {blog.body.map((para, i) => (
              <p key={i} className="m-0 text-[17px] mq450:text-[15px] leading-relaxed text-[rgba(0,0,0,0.65)] font-medium text-justify">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
