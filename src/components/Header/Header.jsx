import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status); // from authSlice file , hum check kar
                                                                // rahe ki user ka status kya hai.

  const navigate = useNavigate();                               
  const navItems = [
    {
      name: 'Home',
      slug: '/',// slug kuch ni URL jaise hai jisse humne slug bola hai.
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus,
    },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <Container>
        <nav className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Logo width="40px" className="mr-4" />
            </Link>
            <ul className="flex space-x-4">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md transition-colors duration-200"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null // item active ni hai thi user ko sign up , bagera display ni karege.
              )}
            </ul>
          </div>
          {authStatus && ( // agar authStaus true hai tho logoutBtn show karo warna show mat karo.
            <div>
              <LogoutBtn />
            </div>
          )}
        </nav>
      </Container>
    </header>
  );
}

export default Header;
