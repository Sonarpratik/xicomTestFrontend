import React, { useEffect, useState } from "react";
import "./user.css";
import CustomModel from "../../molecules/model/CustomModel";
import SimpleTable from "./table/SimpleTable";
const User = ({performCancel}) => {
    const imp="there could be user table"
    const [userData, setUserData] = useState(null); // State to store user data
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors
    const columns = [
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName',
          width: '20%',
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName',
          width: '20%',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          width: '20%',
        },
        {
          title: 'Birth Date',
          dataIndex: 'birthDate',
          key: 'birthDate',
          width: '20%',
          render: (date) => new Date(date).toLocaleDateString(), // Format date
        },
        {
          title: 'Address Same as Residential',
          dataIndex: 'addressSame',
          key: 'addressSame',
          width: '20%',
          render: (addressSame) => (addressSame ? 'Yes' : 'No'), // Convert boolean to "Yes" or "No"
        },
      ];
      

    useEffect(() => {
      // Function to fetch user data
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/user');
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setUserData(data); // Set user data to state
        } catch (error) {
          setError(error.message); // Set error if fetch fails
        } finally {
          setLoading(false); // Set loading to false after fetch completes
        }
      };
  
      fetchUserData();
    }, []);
  return (
    <CustomModel containerWidth={"100%"} width={"90vw"} height={"68vh"} performCancel={performCancel} fetch={loading}>
<div style={{marginTop:"30px"}}>

<SimpleTable
          className="headerColor colorText"
          data={userData || []}
          columns={columns}
          size={"small"}
          x={500}
          />
          </div>
      </CustomModel>
  );
};

export default User;
