import React, { useState, useContext, useEffect } from 'react';
import { FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag, FaThList, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import Users from "../pages/Users";
import Posts from "../pages/Posts";
import Comments from "../pages/Comments";
import Likes from "../pages/Likes";
import Events from "../pages/Events";
import { AuthContext } from "../context/authContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  // Initialize the activePage state with 'Events'
  const [activePage, setActivePage] = useState('Events');

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const menuItem = [
    { path: "/users", name: "Users", icon: <FaUserAlt /> },
    { path: "/posts", name: "Posts", icon: <FaRegChartBar /> },
    { path: "/comments", name: "Comments", icon: <FaCommentAlt /> },
    { path: "/likes", name: "Likes", icon: <FaShoppingBag /> },
    { path: "/events", name: "Events", icon: <FaThList /> },
    { path: "/logout", name: "Logout", icon: <FaSignOutAlt /> },
  ];

  useEffect(() => {
    const handlePopState = () => {
      if (location.pathname !== '/adminl') {
        navigate('/adminl', { replace: true });
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location.pathname, navigate]);

  const handleNavigation = (name) => {
    if (name === 'Logout') {
      localStorage.removeItem('authToken');
      logout();
      navigate('/adminl', { replace: true });
    } else {
      setActivePage(name);
    }
  };

  const renderComponent = () => {
    switch (activePage) {
      case 'Users':
        return <Users />;
      case 'Posts':
        return <Posts />;
      case 'Comments':
        return <Comments />;
      case 'Likes':
        return <Likes />;
      case 'Events':
        return <Events />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none", color: "white" }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} style={{ color: "white" }} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <div
            key={index}
            className={`link ${activePage === item.name ? 'active' : ''}`}
            onClick={() => handleNavigation(item.name)}
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
      <div className={`content ${isOpen ? 'shifted' : ''}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color:'white' }}>
        <div className="selected-item">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
