import { useState, useRef, useEffect } from "react";
import '../../../stylesheet/common/collapsibleText.scss'

interface CollapsibleTextProps {
  text: string;
  lines: number;
}

const CollapsibleText = ({ text, lines }: CollapsibleTextProps) => {
  const [show, setShow] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const alturaOriginal = el.scrollHeight;
    el.style.webkitLineClamp = lines.toString();
    requestAnimationFrame(() => {
      const alturaLimitada = el.getBoundingClientRect().height;
      setShowButton(alturaOriginal > alturaLimitada);
      el.style.webkitLineClamp = show ? "unset" : lines.toString();
    });
  }, [text, lines, show]);

  return (
    <div className="collapsibleText">
      <p
        ref={textRef}
        className={`collapsibleText_text ${show ? "collapsibleText_textShow" : ""}`}
        style={{ WebkitLineClamp: show ? "unset" : lines }}
      >
        {text}
      </p>
        {showButton && (
          <span
            className="collapsibleText_button"
            onClick={() => setShow(!show)}
          >
            {" "}{show ? "Mostrar menos" : "Mostrar más"}
          </span>
        )}
    </div>
  );
};

export default CollapsibleText;