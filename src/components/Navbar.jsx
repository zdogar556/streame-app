import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";


const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    {name:"Home", path:"/"},
    {name:"Movies", path:"/movies"},
    {name:"TV Shows", path:"/tv-shows"},
    {name:"Live Sports", path:"/sports"},
    {name:"My List", path:"/my-list"},
  ];


  return (

    <nav 
    className=" top-0 left-0 w-full bg-black/90 text-white z-50 relative">
      <div
      className="max-w-7xl mx-auto px-6 py-4  flex items-center justify-between "
      >
        {/* Logo */}
      <h1 
      className="text-2xl md:text-xl font-bold cursor-pointer">
        Streame <span 
        className="text-red-500">ZD</span>
      </h1>


      {/* Links */}
      <div 
      className="hidden md:flex gap-8">

        {
          links.map((link)=>(

            <NavLink
              key={link.path}
              to={link.path}
              className={({isActive})=>
                isActive
                ? "text-red-500 font-bold"
                : "hover:text-red-400"
              }
            >

              {link.name}

            </NavLink>

          ))
        }
        
      </div>
      {/* Mobile Links */}
      <button
      className="md:hidden"
      onClick={() => setOpen(!open)}
      >
          {open ? (
            <X size={30} className="text-white" />
          ) : (
            <Menu size={30} className="text-white" />
          )}
      </button>
      </div>
      {/* Mobile Menu */}
      <div
  className={`absolute right-0 top-full md:hidden w-52 bg-black/90 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-300 ${
    open ? "max-h-96 py-4" : "max-h-0 py-0"
  }`}
>
  <div className="flex flex-col  ">
    {links.map((link) => (
      <NavLink
        key={link.path}
        to={link.path}
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `px-6 py-3 ${
            isActive
              ? "text-red-500 font-bold"
              : "hover:bg-gray-800 hover:text-red-400"
          }`
        }
      >
        {link.name}
      </NavLink>
    ))}
  </div>
</div>

    </nav>

  )
}


export default Navbar;