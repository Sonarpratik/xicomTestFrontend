import "./table.css";
import { Table} from "antd";


const SimpleTable = ({ columns, data, size ,x}) => {

  return (
    <>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        size={size}
        scroll={{ x: x?x:1200 }}
      />
    </>
  );
};

export default SimpleTable;
