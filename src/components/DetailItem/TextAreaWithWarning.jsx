import React, { useState } from "react";

const TextAreaWithWarning = () => {
  const [isFocused, setFocused] = useState(false);
  const [text, setText] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    setShowWarning(false);
  };

  const handleBlur = () => {
    setFocused(false);
    if (!text.trim()) {
      setShowWarning(true);
    }
  };

  return (
    <div>
      <textarea
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Nhập đánh giá..."
        style={{
          borderColor: isFocused ? "blue" : "initial",
          width: "446px",
          borderRadius: "8px",
          resize: "none",
          height: "192px",
          padding: "12px",
        }}
      />
      {showWarning && <p style={{ color: "red" }}>Vui lòng nhập đánh giá!</p>}
    </div>
  );
};

export default TextAreaWithWarning;
