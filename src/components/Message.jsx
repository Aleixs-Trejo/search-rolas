// CSS
import "../css/Message.css";

// SVG

import icon from "../assets/icon-error-white.svg";

const Message = ({ text, bgColor }) => {
  let style = {
    backgroundColor: bgColor || "#dc3545"
  }

  return (
    <div className="message__container" style={style}>
      <div className="message__content">
        <figure className="message__figure">
          <img className="message__img" src={icon} alt="Icon Error" />
        </figure>
        <span className="message__text">{text}</span>
      </div>
    </div>
  )
};

export default Message;