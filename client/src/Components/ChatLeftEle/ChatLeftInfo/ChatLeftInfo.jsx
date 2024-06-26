import React, { useEffect, useRef, useState } from "react";
import SearchContact from "./SearchContact";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../service/actions/userLogActions";
import { useNavigate } from "react-router-dom";

function ChatLeftInfo(props) {
  const [dropDown, setDropdown] = useState(false);
  const [searchContact, setSearchContact] = useState(false);
  const userId = window.localStorage.getItem("userId");
  const dropRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDropdown = () => {
    setDropdown(!dropDown);
  };

  const handleSearchContact = () => {
    setSearchContact(!searchContact);
  };

  useEffect(() => {
    const handleCloseEvent = (event) => {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    document.addEventListener("click", handleCloseEvent);

    return () => {
      document.removeEventListener("click", handleCloseEvent);
    };
  }, []);

  const handleLogOut = () => {
    dispatch(logout());
    window.sessionStorage.removeItem("loggedIn");
    navigate("/login");
    console.log("Logged Out successfully");
  };

  return (
    <div className="info-lt">
      <div className="info-user-id">
        <h4>{userId}</h4>
      </div>
      <div className="drop-down" ref={dropRef}>
        <button className="drop-button" onClick={handleDropdown}>
          <h5>&#x22EE;</h5>
        </button>
        {dropDown && (
          <div className="drop-content">
            <ul style={{ listStyle: "none" }}>
              <li>
                <button
                  onClick={() => {
                    handleDropdown();
                    handleSearchContact();
                  }}
                  className="add-btn"
                >
                  <h5>Add Contact</h5>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleDropdown();
                    handleLogOut();
                  }}
                  className="logout-btn"
                >
                  <h5>Log Out</h5>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      {searchContact && (
        <div className="add-contact-search">
          <SearchContact />
          <button onClick={handleSearchContact}>Close</button>
        </div>
      )}
    </div>
  );
}

export default ChatLeftInfo;
