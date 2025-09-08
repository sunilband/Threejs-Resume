import Script from "next/script";

const Schema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sunil Band",
    url: "https://sunilresume.vercel.app",
    image: "https://sunilresume.vercel.app/sunil-band.jpg",
    sameAs: [
      "https://github.com/sunilband",
      "https://www.linkedin.com/in/sunil-band",
      "https://www.instagram.com/chaichopath",
    ],
    jobTitle: "Frontend Developer",
    worksFor: {
      "@type": "Organization",
      name: "Gamezop",
    },
    knowsAbout: [
      "Web Development",
      "React",
      "Next.js",
      "JavaScript",
      "Performance Optimization",
      "UI/UX",
      "Frontend Development",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Express.js",
      "CSS",
      "Scss",
    ],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://sunilresume.vercel.app",
    },
    // hasPart: [
    //   {
    //     "@type": "CreativeWork",
    //     name: "Project One",
    //     description:
    //       "A React-based web app that improves productivity for remote teams.",
    //     url: "https://your-portfolio.com/projects/project-one",
    //     thumbnailUrl: "https://your-portfolio.com/images/project-one.png",
    //   },
    //   {
    //     "@type": "CreativeWork",
    //     name: "Project Two",
    //     description:
    //       "A Next.js ecommerce platform optimized for SEO and speed.",
    //     url: "https://your-portfolio.com/projects/project-two",
    //     thumbnailUrl: "https://your-portfolio.com/images/project-two.png",
    //   },
    // ],
  };
  return (
    <Script
      id="portfolio-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
};

export default Schema;
