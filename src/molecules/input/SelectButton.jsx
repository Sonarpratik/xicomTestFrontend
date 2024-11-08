import { ErrorMessage, Field } from 'formik'
import React from 'react'

const SelectButton = ({array,name,label,required,
  labelDisable,onSelect
}) => {
  return (
    <div>
      {labelDisable?null:

    <label
    htmlFor={name}
    className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label} {required&&<span style={{color:"red"}}>*</span>}
    </label>
    }
    <Field
    required={required?required:false}
      as="select"
      id={name}
      onSelect={onSelect}
      name={name}
      
      autoComplete="country"
      className="block w-full rounded-md border-0 py-1.5 pl-2 shadow-sm ring-1 ring-inset focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      <option value="" label={`Select a ${label}`} />
      {array?.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </Field>
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-600 text-sm mt-1"
    />
  </div>
  )
}

export default SelectButton
