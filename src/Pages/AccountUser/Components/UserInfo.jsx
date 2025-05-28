import { useEffect, useState } from "react";
import imgUserPlaceholder from "../../../assets/images/home.jpg";
import { useLanguage } from "../../../Components/Languages/LanguageContext";
// import ProfileAPI from "api/profileApi"; // Replace with the actual API import

const UserInfo = () => {
  const [profile, setProfile] = useState({
    name: "",
    photo: imgUserPlaceholder,
  });
  const [loading, setLoading] = useState(true);
  const { currentLanguage } = useLanguage(); // Optional, for handling translations

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await ProfileAPI.getProfile(); // Fetch profile data from API
        if (response && response.data) {
          setProfile({
            name: response.data.name || (currentLanguage === "ar" ? "مستخدم" : "User"),
            photo: response.data.photo || imgUserPlaceholder,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // Refetch on language change if necessary

  if (loading) {
    return <div className="loading-text">{currentLanguage === "ar" ? "جارٍ التحميل..." : "Loading..."}</div>;
  }
  return (
    <div className="header-user-info-profile">
      <div className="image-user">
        <img
          src={profile.photo || "https://t3.ftcdn.net/jpg/06/33/54/78/360_F_633547842_AugYzexTpMJ9z1YcpTKUBoqBF0CUCk10.jpg"}
          alt="User"
          className="object-fit-cover rounded-5"
          width={"82px"}
          height={"82px"}
        />
      </div>
      <h2 className="name-user-info">{profile.name}</h2>
    </div>
  );
};

export default UserInfo;
