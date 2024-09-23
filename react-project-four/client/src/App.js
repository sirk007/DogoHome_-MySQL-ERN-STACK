import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { CreatePost, Home, LandingPage, Login,
PageNotFound, Post, Registration, UserProfile,
AdminLogin, ShelterLogin, RegistrationShelter,
RegistrationAdmin, AdminLandingPage, AdminViewUsers, ShelterLandingPage,
ShelterProfile, UserLandingPage, ShelterAddAnimal, UserShelterFilter, Logout,
ShelterAnimalListings} from './pages';
import { AuthContext } from './helpers/AuthContext';
import imgIcon from './images/iconImage.png';

// Custom CSS Imports
import './App.css';
import './pages/createPost/createPost.css';
import './pages/home/home.css';
import './pages/posts/post.css';
import './pages/userProfile/userProfile.css';
import './pages/landingPage/landingPage.css';
// Bootstrap CSS 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavDropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';



function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    userType: "",
    status: false
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const adminAccessToken = sessionStorage.getItem("adminAccessToken");
        const shelterAccessToken = sessionStorage.getItem("shelterAccessToken");

        let response;
        if (accessToken) {
            response = await axios.get("http://localhost:3002/auth/auth", {
            headers: {
              accessToken: accessToken,
            },
          });
        } else if (adminAccessToken) {
            response = await axios.get("http://localhost:3002/admin/auth", {
            headers: {
              adminAccessToken: adminAccessToken,
            },
          });
        } else if (shelterAccessToken) {
            response = await axios.get("http://localhost:3002/shelter/auth", {
            headers: {
              shelterAccessToken: shelterAccessToken,
            },
          });
        } else {
          // No token found, set auth state to false
          setAuthState((prevAuthState) => ({
            ...prevAuthState,
            status: false,
          }));
          return;
        }
  
        if (response.data.error) {
          setAuthState((prevAuthState) => ({
            ...prevAuthState,
            status: false,
          }));
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            userType: response.data.userType,
            status: true,
          });
        }
      } catch (error) {
        console.error("Error fetching authentication data:", error);
      }
    };
  
    fetchData();
  }, []);


  console.log(authState);
  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
        <Navbar className="navbar border-body">
            {!authState.status ? (
              <div className="reglogDiv">
                <Nav>
                <div className="landingPageDiv">
                  <Link to="/landingPage">
                    <img src={imgIcon} alt="Landing Page" className="img-icon" />
                  </Link>
                </div>
                  <NavDropdown title="Login" id="login-dropdown" menuVariant="dark">
                  <NavDropdown.Item as={Link} to="/login">User Login</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/shelter/login">Shelter Login</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/admin/login">Admin Login</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Registration" id="registration-dropdown" menuVariant="dark">
                  <NavDropdown.Item as={Link} to="/registration">User Registration</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/shelter/registration">Shelter Registration</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/admin/registration">Admin Registration</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              </div>
            ) : (
              <>
                {authState.userType === "Admin" && (
                  <>
                    <Link to="/admin/landingPage">Landing Page</Link>
                    <Link to="/admin/users">View all users</Link>
                    <Logout setAuthState={setAuthState} />
                  </>
                )}
                {authState.userType === "User" && (
                  <>
                    <div className="navLinks"><Navbar.Brand href="/">Dogo Home</Navbar.Brand></div>
                    {/**<div className="navLinks"><Link to="/user/userLandingPage">Landing Page</Link></div> */}
                    <div className="navLinks"><Link to="/user/userShelterFilter">Shelters</Link></div>
                    <div className="navLinks"><Link to="/createpost">Create A Post</Link></div>
                    <div className="loggedInContainer">
                      <div className="usernameBox">
                        <Link to={`/userProfile/${authState.id}`}>My Profile</Link>
                      </div>
                      <Logout setAuthState={setAuthState} />
                    </div>
                  </>
                )}
                {authState.userType === "Shelter" && (
                  <>
                    <Link to="/shelter/shelterLandingPage">Shelter Dashboard</Link>
                    <Link to="/shelter/shelterAddAnimal">Add Animal</Link>
                    <div className="loggedInContainer">
                      <div className="usernameBox">
                        <Link to={`/shelterProfile/${authState.id}`}>My Shelter Profile</Link>
                      </div>
                      <Logout setAuthState={setAuthState} />
                    </div>
                  </>
                )}
                
              </>
            )}
          </Navbar>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/landingPage" element={<LandingPage />} />
            <Route path="/user/userLandingPage" element={<UserLandingPage />} />
            <Route path="/user/userShelterFilter" element={<UserShelterFilter />} />
            <Route path="/admin/landingPage" element={<AdminLandingPage />} />
            <Route path="/shelter/shelterLandingPage" element={<ShelterLandingPage />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/admin/users" element={<AdminViewUsers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/shelter/login" element={<ShelterLogin />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/shelter/registration" element={<RegistrationShelter />} />
            <Route path="/admin/registration" element={<RegistrationAdmin />} />
            <Route path="/userProfile/:id" element={<UserProfile />} />
            <Route path="/shelter/shelterAddAnimal" element={<ShelterAddAnimal />} />
            <Route path="/shelterProfile/:id" element={<ShelterProfile />} />
            <Route path="/shelter/ShelterAnimalListings/:id" element={<ShelterAnimalListings />} />
            <Route path="*" element={<PageNotFound />} />
            
          </Routes>
          <footer className="footer mt-auto py-3 bg-dark text-white">
          <div className="container text-center">
            <p>&copy; 2024 Dogo Home. All Rights Reserved.</p>
            <div className="row">
              <div className="col">
                <p className="mb-0">
                  <a href="https://www.google.com/" className="text-white">Terms of Service</a> | 
                  <a href="https://www.google.com/" className="text-white">Privacy Policy</a> | 
                  <a href="https://www.google.com/" className="text-white">Contact Us</a>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="mb-0">
                  Follow Us: 
                  <a href="https://www.facebook.com/" className="text-white">Facebook</a> | 
                  <a href="https://twitter.com/" className="text-white">Twitter</a> | 
                  <a href="https://www.instagram.com/" className="text-white">Instagram</a>
                </p>
              </div>
            </div>
          </div>
        </footer>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;