import { useState ,useEffect} from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBBtn,
  MDBValidation,
  MDBSpinner,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTours } from "../redux/features/tourSlice";

const initialState = {
  title: "",
  description: "",
  tags: [],
  
};
function AddEditTour() {
  const [tourData, setTourData] = useState(initialState);
  const { title, description, tags } = tourData;
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const {error,loading}=useSelector((state)=>({...state.tour}))
  const {user}=useSelector((state)=>({...state.auth}))
  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  const handleSubmit=(e)=>{
    e.preventDefault();
if(title && description && tags) {
  const upadatedTourData={...tourData,name:user?.result?.name,}
  dispatch(createTours({upadatedTourData,navigate,toast}))
  handleClear()
}

  }
  const onInputChange=(e)=>{
    const{name,value}=e.target
    setTourData({...tourData,[name]:value})
  }
  const handleAddTag=(tag)=>{
    setTourData({...tourData, tags: [...tourData.tags,tag]})
  }
  const handleDeleteTag=(deleteTag)=>{
    setTourData({...tourData, tags:tourData.tags.filter((tag)=> tag !==deleteTag)})
  }
  const handleClear=()=>{
    setTourData({title:"", description:"",tags:[]})
  }
  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
      className="container"
    >
      <MDBCard alignment="center">
        <h5>Add Tour</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
            <div className="col-md-12">
              <input
                placeholder=" EnterTitle"
                type="text"
                value={title}
                name="title"
                className="form-control"
                onChange={onInputChange}
                required
                invalid
                validation="Please provide your title"
               
              ></input>
            </div>
            <div className="col-md-12">
              <textarea
                placeholder="Enter Description"
                type="textl"
                value={description}
                name="description"
                onChange={onInputChange}
                className="form-control"
                required
                invalid
                validation="Please provide your description"
                style={{ height: "100px" }}
              ></textarea>
            </div>
            <div className="col-md-12">
              <ChipInput
                name="tags"
                variant="outlined"
                placeholder="Enter a Tag"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
                
              ></ChipInput>
            </div>
            <div className="d-flex jusify-content-start">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setTourData({ ...tourData, imageFile: base64 })
                }
              ></FileBase>
            </div>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }}>Submit</MDBBtn>
              <MDBBtn
                style={{ width: "100%" }}
                className="mt-2 "
                color="danger"
                onClick={handleClear}
              >
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

export default AddEditTour;
