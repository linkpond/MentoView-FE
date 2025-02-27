import axios from "axios";
import { useSelector } from "react-redux";
// localhost:3000/test 경로로 가서 테스트 진행


const Test = () => {
    // JS 여기에 사용하시면 됩니다


    const Paduk = () => {
        alert("파덕파덕");
    }

    //
    return (
        // html 이나 jsx 여기에 사용하시면 됩니다, return () 안에 무조건 부모 div가 하나 있어야 작동함. <> 여기안에 코드 쓰기 </>
        <>
            <button onClick={Paduk}>테스트</button>
            <button onClick={() => {
                axios.get("http://localhost:8080/api/test")
                    .then(response => {
                        alert(response.data);
                    })
                    .catch(error => {
                        console.error("❌ 오류 발생:", error);
                    });
            }}>요청</button>
        </>
    )
};

export default Test;