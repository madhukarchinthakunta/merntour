import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardGroup,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
function CardTour({ imageFile, title, description, tags, _id, name }) {
    const exceprt= (str)=>{
        if(str.length >45){
            str=str.substring(0,45)+"..."
        }
        return str;
    }
  return (
    <div>
      <MDBCardGroup>
        <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
          <MDBCardImage
            src={imageFile}
            alt={title}
            position="top"
            style={{ maxWidth: "100%", height: "180px" }}
          />

          <div className="top-left">{name}</div>
          <span className="text-start tag-card">
            {tags.map((item) => `#${tags}`)}
          </span>
          <MDBCardBody>
            <MDBCardTitle className="text-start">{title}</MDBCardTitle>
            <MDBCardText className="text-start">{exceprt(description)}
            <Link to={`/tour/${_id}`}>Read More</Link>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCardGroup>
    </div>
  );
}

export default CardTour;
