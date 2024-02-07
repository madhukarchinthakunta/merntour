import React ,{useEffect}from "react";
import { MDBCol, MDBContainer, MDBTypography, MDBRow } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getTours } from "../redux/features/tourSlice";
import CardTour from "./CardTour";
function Home() {
  let dispatch = useDispatch();
  const {tours,loading}=useSelector((state)=>({...state.tour}))
  useEffect(()=>{
    dispatch(getTours())
  },[])
  if(loading){
    return <h2>loading ....</h2>
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className="mt-5">
      {tours.length ===0 &&(
        <MDBTypography className="text-center mb-0" tag="h2"> NO tour</MDBTypography>
       
      )}
      <MDBCol>
        <MDBRow className="row-cols-1 row-cols-md-3 g-2">
          {tours &&tours.map((item,index)=>(
           <CardTour key={index} {...item}></CardTour>
          )

          )}
        </MDBRow>
      </MDBCol>
       </MDBRow>
    </div>
  );
}

export default Home;
