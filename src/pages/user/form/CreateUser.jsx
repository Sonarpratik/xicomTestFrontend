import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as yup from "yup";
import InputField from "../../../molecules/input/InputField";
import { DeleteOutlined } from "@ant-design/icons";
import { checkFile, typeOfFileArray } from "../../../assets/State";
import SelectButton from "../../../molecules/input/SelectButton";
import InputFile from "../../../molecules/input/InputFile";
import { url } from "../../../assets/url";
import { message } from "antd";
const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  const formData = new FormData();

  // Loop over each file and append its details
  values.files.forEach((fileObj, index) => {
    formData.append(`fileName`, fileObj.fileName); // Append fileName
    formData.append(`typeOfFile`, fileObj.typeOfFile); // Append typeOfFile
    formData.append("document", fileObj.document); // Append the actual file (binary)
  });

  // Append other form fields (non-file fields)
  Object.keys(values).forEach((key) => {
    if (key !== "files") {
      formData.append(key, values[key]); // Append other non-file fields like firstName, lastName, etc.
    }
  });

  try {
    const response = await fetch(`${url}/api/user`, {
      method: "POST",
      body: formData, // Send formData to backend
    });

    const result = await response.json();
    message.success("User created successfully!"); // Show success message
    resetForm(); // Handle response
  } catch (error) {
    console.error("Error uploading data:", error);
  }

  setSubmitting(false);
};

const CreateUser = ({ formValue }) => {
  // Validation schema
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
        "Email must be a valid address ending with .com"
      )
      .required("Email is required"),

    birthDate: yup
      .date()
      .required("Birth date is required")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "User must be at least 18 years old"
      ),
    residentialAddressStreet1: yup.string().required("Street 1 is required"),
    residentialAddressStreet2: yup.string().required("Street 2 is required"),
    permanentAddressStreet1: yup.string(),
    permanentAddressStreet2: yup.string(),

    addressSame: yup.boolean(),
    files: yup.array().of(
      yup.object().shape({
        fileName: yup.string().required("File name is required"),
        typeOfFile: yup.string().required("File type is required"),
        document: yup
          .mixed()
          .required("Document is required")
          .when("typeOfFile", {
            is: "pdf",
            then: (schema) =>
              schema.test(
                "fileType",
                "Only PDF files are allowed",
                (value) => value && value.type === "application/pdf"
              ),
            otherwise: (schema) =>
              schema.test(
                "fileType",
                "Only image files (PNG, JPEG, JPG) are allowed",
                (value) =>
                  value &&
                  ["image/png", "image/jpeg", "image/jpg"].includes(value.type)
              ),
          }),
      })
    ),
  });

  // Initial values
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    residentialAddressStreet1: "",
    residentialAddressStreet2: "",
    permanentAddressStreet1: "",
    permanentAddressStreet2: "",
    addressSame: false,
    files: [
      { fileName: "", typeOfFile: "pdf", document: "" },
      { fileName: "", typeOfFile: "pdf", document: "" },
    ],
  };

  return (
    <div>
      <div className="sm:mx-auto w-full">
        <Formik
          initialValues={formValue?._id ? formValue : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Basic Info Fields */}
              <InputField
                placeholder={"Enter your first name here"}
                required={true}
                name="firstName"
                label="First Name"
              />
              <InputField
                placeholder={"Enter your last name here"}
                required={true}
                name="lastName"
                label="Last Name"
              />
              <InputField
                placeholder={"ex: myname@example.com"}
                required={true}
                name="email"
                label="Email"
                type="email"
              />
              <InputField
                placeholder={"Date of Birth"}
                required={true}
                name="birthDate"
                label="Birth Date"
                type="date"
              />

              {/* Address Fields */}
              <InputField
                required={true}
                name="residentialAddressStreet1"
                label="Residential Street 1"
              />
              <InputField
                required={true}
                name="residentialAddressStreet2"
                label="Residential Street 2"
              />
              <label className="flex items-center col-span-full">
                <Field type="checkbox" name="addressSame" />
                <span className="ml-2">Address is the same as residential</span>
              </label>
              <InputField
                required={!values?.addressSame}
                name="permanentAddressStreet1"
                label="Permanent Street 1"
              />
              <InputField
                required={!values?.addressSame}
                name="permanentAddressStreet2"
                label="Permanent Street 2"
              />

              {/* Address Same Checkbox */}

              {/* File Upload Fields */}
              <div className="col-span-full">
                <FieldArray name="files">
                  {({ remove, push }) => (
                    <div>
                      <div>Documents:</div>
                      {values.files.map((_, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-4 gap-4 items-center"
                        >
                          <InputField
                            required={true}
                            name={`files[${index}].fileName`}
                            label="File Name"
                          />

                          <SelectButton
                            required={true}
                            array={typeOfFileArray}
                            name={`files[${index}].typeOfFile`}
                            label="File Type"
                          />
                          <InputFile
                            accept={
                              values?.files[index]?.fileType === "pdf"
                                ? "application/pdf"
                                : "image/png, image/jpeg, image/jpg"
                            }
                            required={true}
                            handleFileChange={(event) => {
                              setFieldValue(
                                `files[${index}].document`,
                                event.currentTarget.files[0]
                              );
                            }}
                            name={`files[${index}].document`}
                            label="Document"
                            className="col-span-2"
                          />
                          {values.files.length > 2 && (
                            <button
                              style={{ width: "30px" }}
                              type="button"
                              onClick={() => remove(index)}
                              className="bg-red-500 text-white px-2 py-1 rounded col-span-1 self-end"
                            >
                              <DeleteOutlined />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            fileName: "",
                            typeOfFile: "pdf",
                            document: "",
                          })
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded mt-2 col-span-full"
                      >
                        Add File
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* Submit Button */}
              <div
                className="col-span-full"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  style={{ width: "100px" }}
                  type="submit"
                  //   disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white rounded px-3 py-1.5"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : formValue?._id
                    ? "Update"
                    : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateUser;
