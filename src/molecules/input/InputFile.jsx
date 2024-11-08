import { ErrorMessage, Field } from "formik";

import React from 'react'

const InputFile = ({
    label,
    name,
    type,
    required,
    labelDisable,
    isTextarea,
    placeholder,
    span,
    defaults,
    disable,
    width, // New prop for dynamic width
    display,
    accept ,// New prop for file input accept attribute,
    handleFileChange
  }) => {
  return (
    <div className={`sm:col-span-${span ? span : "1"}`} style={{ width, display: display ? display : "block" }}>
      {
        labelDisable ? null :
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      }
      
        <input
          id={name}
          name={name}
          type="file"
          accept={accept || "image/*"}
          required={required ? required : false}
          disabled={disable ? disable : false}
          className="block w-full rounded-md border-0 py-1.5 pl-2 shadow-sm ring-1 ring-inset focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => handleFileChange(event)} // Passes file input back to Formik
        />
    
      <ErrorMessage name={name} component="div" className="text-red-600 text-sm mt-1" />
    </div>
  )
}

export default InputFile
