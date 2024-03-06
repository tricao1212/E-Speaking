import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";

const CheckRoute = () => {
  const { user } = UserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user != null) {
      // if(user.role===1)
      navigate("/admin");
      // else {
      //     navigate('user')
      // }
    }
  }, [user]);
};
export default CheckRoute;
