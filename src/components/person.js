import React from "react";
import PropTypes from "prop-types";

function GithubLink({ url }) {
    return (
      <a className="mx-2" href={url} aria-label="Facebook">
        <svg
          className="fill-current text-gray-300 hover:text-gray-500 h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M426.8 64H85.2C73.5 64 64 73.5 64 85.2v341.6c0 11.7 9.5 21.2 21.2 21.2H256V296h-45.9v-56H256v-41.4c0-49.6 34.4-76.6 78.7-76.6 21.2 0 44 1.6 49.3 2.3v51.8h-35.3c-24.1 0-28.7 11.4-28.7 28.2V240h57.4l-7.5 56H320v152h106.8c11.7 0 21.2-9.5 21.2-21.2V85.2c0-11.7-9.5-21.2-21.2-21.2z" />
        </svg>
      </a>
    );
  }

function LinkedinLink({ url }) {
    return (
      <a className="mx-2" href={url} aria-label="Linkden">
        <svg
          className="fill-current text-gray-300 hover:text-gray-500 h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M417.2 64H96.8C79.3 64 64 76.6 64 93.9V415c0 17.4 15.3 32.9 32.8 32.9h320.3c17.6 0 30.8-15.6 30.8-32.9V93.9C448 76.6 434.7 64 417.2 64zM183 384h-55V213h55v171zm-25.6-197h-.4c-17.6 0-29-13.1-29-29.5 0-16.7 11.7-29.5 29.7-29.5s29 12.7 29.4 29.5c0 16.4-11.4 29.5-29.7 29.5zM384 384h-55v-93.5c0-22.4-8-37.7-27.9-37.7-15.2 0-24.2 10.3-28.2 20.3-1.5 3.6-1.9 8.5-1.9 13.5V384h-55V213h55v23.8c8-11.4 20.5-27.8 49.6-27.8 36.1 0 63.4 23.8 63.4 75.1V384z" />
        </svg>
      </a>
    );
  }

function Person({person}) {
    const { name} = person;
    return (
        <section>
            <h3>{name}</h3>
            <p>from components/person.js</p>
        </section>
    );
}

Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    // socialGithub: PropTypes.string.GithubLink,
    // socialLinkedIn: PropTypes.string.LinkedinLink,
  }).isRequired,
};

export default Person;