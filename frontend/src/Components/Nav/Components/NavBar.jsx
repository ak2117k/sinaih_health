import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import logo from "../../../assets/SinaiHealth.jpg";

const NavBar = () => {
  const brands = useSelector((state) => state.brands.brands);
  const params = useParams();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsHovered(false);
  }, [params]);

  return (
    <div className="">
      {/* Desktop Navigation - Hidden on smaller screens */}
      <nav className="hidden md:block lg:block ">
        {/* Desktop Navigation */}
        <div className="flex gap-6 text-sm ml-10 p-4">
          <ul className="flex gap-6 ml-50">
            <Link to="/">
              <li className="p-2 hover:bg-[rgb(135,164,2)] hover:text-white text-black cursor-pointer">
                Home
              </li>
            </Link>
            <Link className="" to="/medicines">
              <li className="p-2 hover:bg-[rgb(135,164,2)] hover:text-white text-black cursor-pointer">
                Men
              </li>
            </Link>
            <Link to="/medicines" className="">
              <li className="p-2 hover:bg-[rgb(135,164,2)] hover:text-white text-black cursor-pointer">
                Women
              </li>
            </Link>
            <Link>
              <li className="p-2 hover:bg-[rgb(135,164,2)] hover:text-white text-black cursor-pointer">
                <Link to="/medicines"> Medicine</Link>
              </li>
            </Link>
            <li
              className="p-2 hover:bg-[rgb(135,164,2)] text-black cursor-pointer relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Products
              {brands && isHovered && (
                <div className="absolute top-6 left-0 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <ul className="space-y-2 p-2">
                    {brands?.map((b, index) => (
                      <li
                        key={index}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        <Link to={`/medicines/${b}`}>{b}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            {/* <li className="p-2 hover:bg-[rgb(135,164,2)] hover:text-white text-black cursor-pointer">
              Testimonials
            </li> */}
            <Link to="/about-us">
              <li className="p-2 hover:bg-[rgb(135,164,2)] hover:text-white text-black cursor-pointer">
                About Us
              </li>
            </Link>
            <li className="p-2 hover:bg-[rgb(135,164,2)] hover:text-white text-black cursor-pointer">
              Blogs
            </li>
            <li className="p-2 hover:bg-[rgb(135,164,2)] hover:text-white text-black cursor-pointer">
              Contact Us
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation - Hidden on medium and larger screens */}
      <nav className="block md:hidden lg:hidden ">
        <div className="w-40 h-14 flex justify-center items-center ">
          <Link to="/" className="flex justify-center w-full">
            {" "}
            <img
              src={logo}
              className="h-14 rounded-full object-cover p-1 ml-40"
            ></img>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
