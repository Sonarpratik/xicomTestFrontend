export const typeOfFileArray = ["image", "pdf"];

export const checkFile = (event, index, values) => {

  return values?.files[index]?.fileType === "pdf"
  ? event?.type === "application/pdf"
  : values?.files[index]?.fileType === "image" &&
    ["image/png", "image/jpeg", "image/jpg"].includes(event?.type);

};
