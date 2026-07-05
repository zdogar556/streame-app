import React from "react";
import { NavLink } from "react-router-dom";


const Navbar = () => {

  const links = [
    {name:"Home", path:"/"},
    {name:"Movies", path:"/movies"},
    {name:"TV Shows", path:"/tv-shows"},
    {name:"Live Sports", path:"/sports"},
    {name:"My List", path:"/my-list"},
  ];


  return (

    <nav 
    className="  bg-black text-white px-8 py-4 flex items-center justify-between ">

      {/* Logo */}
      <h1 
      className="text-3xl font-bold text-White-600">
        Streame <span 
        className="text-red-500">ZD</span>
      </h1>


      {/* Links */}
      <div 
      className="flex gap-8">

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


    </nav>

  )
}


export default Navbar;