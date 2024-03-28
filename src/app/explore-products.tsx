import { Typography } from "@mui/material"
import ProductCard from "@/components/product-card"

const PRODUCTS = [
  {
    id:101,
    img: "/image/blogs/blog4.svg",
    tag: "Beginner • 25 Classes • 200 Students",
    title: "Unlock the Web Foundation",
    label: "from $99",
    desc: "Dive into HTML to structure your content and CSS to style it. By the end, you'll be crafting beautiful web pages from scratch.",
  },
  {
    id:102,
    img: "/image/blogs/blog3.svg",
    tag: "Medium • 10 Classes • 150 Students",
    title: "Craft Websites That Adapt",
    label: "from $199",
    desc: "Our Responsive Design course teaches you the art of creating websites that seamlessly adapt to different devices and screen sizes.",
  },
  {
    id:103,
    img: "/image/blogs/blog4.svg",
    tag: "Medium • 23 Classes • 590 Students",
    title: "Master the Power of React",
    label: "from $499",
    desc: "Take your frontend development to the next level with our React Development course. Learn how to build interactive, dynamic web applications.",
  },
  {
    id:104,
    img: "/image/blogs/blog5.svg",
    tag: "Beginner • 35 Classes • 400 Students",
    title: "Frontend Essentials Course",
    label: "from $49",
    desc: "For aspiring web developers, the Frontend Essentials course is a must. Dive into the core technologies - HTML, CSS, and JavaScript.",
  }
];

export function ExploreProducts() {
  return (
    <section className="px-8">
      <div className="container mx-auto mb-24 text-center">
        <Typography variant="h2" color="blue-gray">
          Explore Products
        </Typography>
        <Typography
          className="mt-2 mx-auto w-full px-4 !text-gray-500 lg:w-6/12 lg:px-8"
        >
          Browse through 1,000+ web development courses and find the one that
          fits your needs.
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-24 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-14">
        {PRODUCTS.map((props, idx) => (
          <ProductCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

export default ExploreProducts;
