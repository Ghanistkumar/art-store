import { Typography, Button, Input } from "@mui/material";

const LINKS = [
  {
    title: "Company",
    items: ["About Us", "Careers", "Premium Tools", "Blog"],
  },
  {
    title: "Pages",
    items: ["Login", "Register", "Add List", "Contact"],
  },
  {
    title: "Legal",
    items: ["Terms", "Privacy", "Team", "About Us"],
  },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="px-8 pt-24 pb-8">
      <div className="container max-w-6xl flex flex-col mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 !w-full ">
          <div className="flex col-span-2 items-center gap-10 mb-10 lg:mb-0 md:gap-36">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography className="py-1 font-normal !text-gray-700 transition-colors hover:!text-gray-900">
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="">
            <Typography variant="h6" className="mb-3 text-left">
              Subscribe
            </Typography>
            <div className="!text-gray-500 font-normal mb-4 text-base">
              Get access to subscriber exclusive deals and be the first who gets
              informed about fresh sales.
            </div>
            <div className="mb-2 text-left font-sans font-medium">
              Your Email
            </div>
            <div className="flex mb-3 flex-col lg:flex-row items-start gap-4">
              <div className="w-full">
                <input
                  type="email"
                  placeholder="Email"
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-1 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  style={{ color: "gray" }}
                />
                <div className="font-medium mt-3 !text-sm !text-gray-500 text-left">
                  I agree the{" "}
                  <a
                    href="#"
                    className="font-bold underline hover:text-gray-900 transition-colors"
                  >
                    Terms and Conditions{" "}
                  </a>
                </div>
              </div>
              <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full lg:w-fit">
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="md:text-center mt-16 font-normal !text-gray-700">
          &copy; {CURRENT_YEAR} Made with{" "}
          <a href="https://www.material-tailwind.com" target="_blank">
            Material Tailwind
          </a>{" "}
          by{" "}
          <a href="https://www.creative-tim.com" target="_blank">
            Creative Tim
          </a>
          .
        </div>
      </div>
    </footer>
  );
}

export default Footer;
