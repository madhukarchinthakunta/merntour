import React, { useState } from 'react'
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarBrand,
    MDBCollapse
} from "mdb-react-ui-kit"
import { useSelector,useDispatch } from "react-redux"
import { setLogout } from '../redux/features/authSlice';
function Headers() {
    const [show, setShow] = useState(false);
    const { user } = useSelector((state) => ({ ...state.auth }))
    const dispatch=useDispatch();
    const handleLogout=()=>{
        dispatch(setLogout())
    }
    return (
        <MDBNavbar fixed='top' expand="lg" style={{ backgroundColor: "#f06ea" }}>
            <MDBContainer>
                <MDBNavbarBrand href="/" style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}>Touroprdia</MDBNavbarBrand>
                <MDBNavbarToggler type="button" aria-expanded="false" aria-label="Toogle navigation" onClick={() => setShow(!show)}>
                    <MDBIcon icon='bars' fas style={{ color: "#606080" }}></MDBIcon>
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>

                    <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                    {user?.result?._id && (
                        <h5 style={{marginRight:"30px", marginTop:"17px"}}>logged in as :{user?.result?.name}</h5>
                    )}
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/">
                                <p className='header-text'>Home</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {user?.result?._id && (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/addTour">
                                        <p className='header-text'>Add Tour</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/dashBoard">
                                        <p className='header-text'>Dashboard</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        )}
                       {user?.result?._id? (
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/login">
                                    <p className='header-text' onClick={handleLogout}>LogOut</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                       ) : (
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/login">
                                <p className='header-text'>LogIn</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                       )}
                        
                        
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    )
}

export default Headers
