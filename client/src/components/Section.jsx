/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "../css/App.css";

function Section({ id, backgroundImage, title, description }) {
  useEffect(() => {
    // Add section-specific functionality here
  }, []);

  return (
    <section
      id={id}
      style={{ backgroundImage }}
      className="section-with-overlay"
    >
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </section>
  );
}

Section.propTypes = {
  id: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Section;
