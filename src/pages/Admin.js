import styled from "styled-components";
import LineChart from "../components/LineChart";
import SalesChart from "../components/SalesCahrt";

const AdminBox = styled.div`
    width: 100%;
    height: calc(100vh - 65px);
    display: flex;
    align-items: center;
`

const Admin = () => {
    return (
        <AdminBox>
            <LineChart/>
            <SalesChart />
        </AdminBox>
    )
};

export default Admin;