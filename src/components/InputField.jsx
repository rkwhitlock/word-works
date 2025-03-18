// InputField.jsx
import React from "react";

const InputField = ({ value, onChange, onSubmit }) => {
  return (
    <div className="mt-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Type the word here"
        className="border p-2 rounded-lg"
      />
      <button
        onClick={onSubmit}
        className="bg-blue-500 text-white p-2 rounded-md mt-4"
      >
        Submit
      </button>
    </div>
  );
};

export default InputField;
