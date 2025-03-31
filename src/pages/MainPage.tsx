import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <li>
        <Button
          variant="primary"
          label="신고 유저 목록 이동"
          width="250px"
          height="33px"
          onClick={() => {
            navigate("/report");
          }}
        />
      </li>
    </div>
  );
};

export default MainPage;
