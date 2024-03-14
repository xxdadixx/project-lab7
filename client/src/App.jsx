/* eslint-disable no-unused-vars */
import React from "react";
import Nav from "./components/Nav";
import Section from "./components/Section";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div>
        <Nav />
        <div id="page" className="">
          <Section
            id="MongoDB"
            backgroundImage="url(https://images.unsplash.com/photo-1658204238967-3a81a063d162?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
            title="MongoDB"
            description="MongoDB is a popular NoSQL database program, known for its flexibility, scalability, and performance."
          />
          <Section
            id="Express"
            backgroundImage="url(https://img2.pic.in.th/pic/1686391647921-1.png)"
            title="Express"
            description="Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications."
          />
          <Section
            id="React"
            backgroundImage="url(https://wallpapercave.com/wp/wp4923992.png)"
            title="React"
            description="React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components and manage the state of their applications efficiently."
          />
          <Section
            id="NodeJS"
            backgroundImage="url(https://img5.pic.in.th/file/secure-sv1/wp6606911-nodejs-wallpapers-1.jpeg)"
            title="Node.js"
            description="Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a web browser. It is commonly used to build server-side applications."
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
