import React from "react";
import PropTypes from "prop-types";

function GithubLink({ url }) {
    return (
      <a className="" href={url} aria-label="Github">
      <svg
        className="fill-current text-gray-300 hover:text-gray-500 h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        {/* TODO: correct icon for GH instead of twitter... */}
        <path d="M492 109.5c-17.4 7.7-36 12.9-55.6 15.3 20-12 35.4-31 42.6-53.6-18.7 11.1-39.4 19.2-61.5 23.5C399.8 75.8 374.6 64 346.8 64c-53.5 0-96.8 43.4-96.8 96.9 0 7.6.8 15 2.5 22.1-80.5-4-151.9-42.6-199.6-101.3-8.3 14.3-13.1 31-13.1 48.7 0 33.6 17.2 63.3 43.2 80.7-16-.4-31-4.8-44-12.1v1.2c0 47 33.4 86.1 77.7 95-8.1 2.2-16.7 3.4-25.5 3.4-6.2 0-12.3-.6-18.2-1.8 12.3 38.5 48.1 66.5 90.5 67.3-33.1 26-74.9 41.5-120.3 41.5-7.8 0-15.5-.5-23.1-1.4C62.8 432 113.7 448 168.3 448 346.6 448 444 300.3 444 172.2c0-4.2-.1-8.4-.3-12.5C462.6 146 479 129 492 109.5z" />
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
    const { name, socialGithub, socialLinkedIn } = person;
    return (
        <section>
            <h3>{name}</h3>
            <p>from components/person.js</p>
            <div className="flex items-center">
              {socialGithub && <GithubLink url={socialGithub} />}
              {socialLinkedIn && <LinkedinLink url={socialLinkedIn} />}
            </div>
        </section>
    );
}

Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    socialGithub: PropTypes.string.isRequired,
    socialLinkedIn: PropTypes.string.isRequired,
  }).isRequired,
};

export default Person;