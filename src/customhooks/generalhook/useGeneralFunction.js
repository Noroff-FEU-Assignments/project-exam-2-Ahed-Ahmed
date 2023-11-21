import { useNavigate } from "react-router-dom";

export const useGeneralFunction = () => {
  const navigate = useNavigate();
  const handleGoBackProfile = () => {
    navigate("/profile");
  };

  const handleGoSinglePostPage = (id) => {
    navigate(`/singlepost/${id}`);
  };

  const handleViewProfileByName = (username) => {
    navigate(`/singleprofile/${username}`);
  };

  return {
    handleGoBackProfile,
    handleGoSinglePostPage,
    handleViewProfileByName,
  };
};
