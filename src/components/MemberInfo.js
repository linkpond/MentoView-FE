import styled from "styled-components";

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;

  @media (max-width: 1100px) {

  }
`;

const Th = styled.th`
  background-color: #f4f4f4;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
`;

const MemberInfo = () => {
    const initMembers = [
        { email: "user1@example.com", name: "Alice", role: "USER", created_at: "2025-03-21", paymentDate: "2025-04-21", plan: "BASIC" },
        { email: "admin@example.com", name: "Bob", role: "ADMIN", created_at: "2025-03-21", paymentDate: "2026-03-21", plan: "PREMIUM" },
        { email: "user2@example.com", name: "Charlie", role: "USER", created_at: "2025-03-21", paymentDate: "2025-09-21", plan: "STANDARD" }
    ];

    return (
        <TableContainer>
            <Table>
                <thead>
                    <tr>
                        <Th>이름</Th>
                        <Th>이메일</Th>
                        <Th>등급</Th>
                        <Th>가입일</Th>
                        <Th>결제일</Th>
                        <Th>이용권</Th>
                    </tr>
                </thead>
                <tbody>
                    {initMembers.map((member, index) => (
                        <tr key={index}>
                            <Td>{member.name}</Td>
                            <Td>{member.email}</Td>
                            <Td>{member.role}</Td>
                            <Td>{member.created_at}</Td>
                            <Td>{member.paymentDate}</Td>
                            <Td>{member.plan}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </TableContainer>
    );
};

export default MemberInfo;
