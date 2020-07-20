import React from "react";
import PropTypes from "prop-types";

class Anchor extends React.Component {
  render() {
    const { path, children, blank, size } = this.props;
    return (
      <a
        href={path}
        target={blank ? "_blank" : "_self"}
        style={{ fontSize: size }}
      >
        {children}
      </a>
    );
  }
}

Anchor.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  blank: PropTypes.bool,
  size: PropTypes.number
};

Anchor.defaultProps = {
  path: "www.naver.com"
};

export default Anchor;
