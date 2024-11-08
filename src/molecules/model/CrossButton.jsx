import { CloseCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
const CrossButton = ({performCancel}) => {
  const IconStyle = {
    color: "gray",
    fontSize: "1.6rem"
  }
  return (
    <div
    onClick={performCancel}
      style={{
        // background: "red",
        // color: "white",
        width: "30px",
        height: "30px",
        borderRadius: "360px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top:"4px",
        right: "4px",cursor:"pointer",      
      }}
    >
      {/* <MdCancel class="bg-sky-500 hover:bg-sky-700 ..." /> */}
      <StyledIcon  
     
      theme="outlined" 
     />
    </div>
  );
};

export default CrossButton;
const StyledIcon = styled(CloseCircleOutlined )`
  color: gray;
  font-size: 1.6rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ff000086;
  }
`;