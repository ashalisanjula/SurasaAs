import React, {useState, useEffect} from "react";
import {useNavigate, useLocation, Link} from "react-router-dom";
import {Link as ScrollLink} from "react-scroll";
import {useDispatch, useSelector} from "react-redux";
import {GiHamburgerMenu} from "react-icons/gi";
import Button from "@mui/material/Button";
import {yellow} from "@mui/material/colors";

import logo from "../../../../src/assets/images/Surasa Logo.png";
import { logoutUser } from "../../../redux/actions";
import UserRequest from "../../../services/Requests/User";
import "./NavBar.css";
import PersonIcon from '@mui/icons-material/Person';
import IconButton from "@mui/material/IconButton";

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [userId, setUserId] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.token !== null);

    const handleLogout = async () => {
        try {
            const {success, message} = await UserRequest.logoutUser();
            console.log("Logout is ok")
            if (success) {
                localStorage.clear();
                console.log("logged out");
                setUserInfo(null);
                navigate("/login");
            } else {
                console.error(message);
                console.log("Error in logging out");
            }
        } catch (error) {
            console.error("An error occurred during logout:", error);
        }
    };

    const toggleDropdown = () => setShowDropdown((prev) => !prev);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem("first_name");
        const UserId = localStorage.getItem("userId")
        setUserId(UserId);
        setUserInfo(storedUserInfo);
    }, [userInfo]);

    const renderNavLink = (to, label) => (location.pathname === "/" ? (<ScrollLink
                className="dropdown-link"
                activeClass="active"
                to={to}
                spy
                smooth
                offset={-70}
                duration={500}
            >
                {label}
            </ScrollLink>) : (<Link to={`/#${to}`} className="dropdown-link">
                {label}
            </Link>));

    const UserActions = () => (userInfo ? (<span><PersonIcon onClick={handleProfileIconClick} sx={{ 
      cursor: "pointer", // Show pointer on hover
      "&:hover": {
        color: "primary.main", // Optional: Change color on hover (MUI theme)
      }
    }}/></span>) : (<>
                <Button
                    disableElevation
                    variant="contained"
                    onClick={() => navigate("/register")}
                    sx={{
                        bgcolor: yellow[700],
                        "&:hover": {bgcolor: "transparent", borderColor: yellow[800], color: yellow[800]},
                    }}
                >
                    Register
                </Button>
                <Button
                    disableElevation
                    variant="outlined"
                    sx={{
                        borderColor: yellow[700], color: yellow[700], "&:hover": {bgcolor: yellow[700], color: "white"},
                    }}
                    onClick={() => navigate("/login")}
                >
                    Login
                </Button>
            </>));

            const handleProfileIconClick = () => {
                navigate(`/user/${userId}/dashboard`); // Navigate to profile
                 };

    return (<div
            className={`bg-NavBarBG ${isScrolled ? "fixed  top-0 left-0 w-full z-50 bg-white opacity-75" : "top-0 left-0 w-full"}`}>
            <nav className="flex justify-between items-center w-full h-[60px] px-[12px] md:px-[20px]">
                <div className="flex">
                    <img className="h-[50px] w-[50px]" src={logo} alt="Surasa Logo"/>
                </div>

                <ul className="hidden lg:flex ml-24 space-x-4">
                    <li>{renderNavLink("home", "Home")}</li>
                    <li>{renderNavLink("about", "About Us")}</li>
                    <li>{renderNavLink("contact", "Contact Us")}</li>
                    {userInfo && (<button className="logout-button" onClick={handleLogout}>
                            Logout
                        </button>)}
                </ul>

                <div className="hidden lg:flex items-center space-x-4">
                    <UserActions/>
                </div>


                {/*Mobile Menu*/}
                <div className="lg:hidden  z-50">
                    <GiHamburgerMenu size={30} onClick={toggleDropdown}/>
                    {showDropdown && (<div className="absolute top-[60px] right-0 bg-amber-50 shadow-md p-6 w-full opacity- ">
                            <ul className="flex flex-col space-y-2 items-center">
                                {userInfo && (<>
                                        {/* <li>Welcome back, {userInfo}</li> */}
                                        <IconButton onClick={handleProfileIconClick} color="primary">
                                                <PersonIcon/>
                                        </IconButton>
                                        
                                        <li
                                            className="logout-button"
                                            onClick={() => {
                                                localStorage.clear();
                                                setUserInfo(null);
                                            }}
                                        >
                                            Logout
                                        </li>
                                    </>)}
                                <li>{renderNavLink("home", "Home")}</li>
                                <li>{renderNavLink("about", "About Us")}</li>
                                <li>{renderNavLink("contact", "Contact Us")}</li>
                                {!userInfo && (
                                    <>
                                        <Button
                                            disableElevation
                                            variant="contained"
                                            onClick={() => navigate("/register")}
                                            sx={{
                                                bgcolor: yellow[700], "&:hover": {
                                                    bgcolor: "transparent", borderColor: yellow[800], color: yellow[800]
                                                },
                                            }}
                                        >
                                            Register
                                        </Button>
                                        <Button
                                            disableElevation
                                            variant="outlined"
                                            sx={{
                                                borderColor: yellow[700],
                                                color: yellow[700],
                                                "&:hover": {bgcolor: yellow[700], color: "white"},
                                            }}
                                            onClick={() => navigate("/login")}
                                        >
                                            Login
                                        </Button>
                                    </>)}
                            </ul>
                        </div>)}
                </div>
            </nav>
        </div>);
};

export default Header;
