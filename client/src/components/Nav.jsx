/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/App.css";

function Nav() {
  useEffect(() => {
    const header = document.getElementById("myHeader");
    const page = document.getElementById("page");
    const openMenuButton = document.getElementById("openmenu");

    const handleScroll = () => {
      page.classList.remove("menuopen");
      if (window.scrollY >= 100) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    };

    const handleClick = (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    openMenuButton.addEventListener("click", () => {
      header.classList.remove("sticky");
      page.classList.add("menuopen");
    });

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => link.addEventListener("click", handleClick));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      links.forEach((link) => link.removeEventListener("click", handleClick));
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <header id="myHeader" className="">
      <Link to="/">
        <img
          id="logo"
          src="./public/logo_MANAGE_without_web.png"
          alt="Bootstrap"
        />
      </Link>
      <nav>
      <Link to="/" onClick={() => scrollToSection('MongoDB')}>MongoDB</Link>
      <Link to="/" onClick={() => scrollToSection('Express')}>Express</Link>
      <Link to="/" onClick={() => scrollToSection('React')}>React</Link>
      <Link to="/" onClick={() => scrollToSection('NodeJS')}>Node.js</Link>
        <Link to="/CRUDClass">CRUDTable</Link>
        <button id="openmenu">
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
}

export default Nav;
