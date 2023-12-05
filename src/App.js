import React, { useState } from "react";
import "./App.css";
import { Button, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

function App() {
  const dummy = [
    {
      title:
        "'The Dark Side of the Moon'",
        image: './images/1.jpg'
    },
    {
      title:
        "'Thriller' - Michael Jackson (Pop)",
        image: './images/2.jpg'
    },
    
  ];

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [data, setData] = useState(dummy);
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("Add Album");
  const [updateId, setUpdateId] = useState(null);
  
  const handleClose = () => {
    setShow(false);
    setTitle("");
    setImage(null)
  }

  const handleSubmit = () => {
    if(title === '') {
      alert('Please enter title')
      return
    }
    if (modalName === "Add Album") {
      setData([...data, { title, image }]);
    } else {
      const updatedData = [...data];
      updatedData[updateId] = { ...updatedData[updateId], title, image };
      setData(updatedData);
    }
    setTitle("");
    setImage(null)
    setShow(false);
  };

  const handleDelete = (id) => {
    const deleted = data.filter((ele, index) => index !== id);
    setData(deleted);
  };

  const handleUpdate = (id) => {
    setModalName("Update Album");
    setShow(true);
    const found = data.find((ele, i) => i === id);
    setTitle(found.title);
    setImage(found.image)
    setUpdateId(id);
  };

  const handleImageUpload = ({target: {files}}) => {
    files[0] && setImage(files[0].name);
    if(files) {
      setImage(URL.createObjectURL(files[0]))
    }
  }

  return (
    <>
      <div className="container mx-auto mt-3">
        <h1 className="text-center">Albums </h1>
        <div className="row my-2">
          <div className="col-md-1">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setModalName("Add Album");
                setShow(true);
              }}
            >
              Add
            </button>
          </div>
        </div>
        <div className="row">
          {data.map((ele, index) => {
            return (
              <div className="col-md-3 my-2" key={index}>
                <div className="card" style={{minHeight: '200px', display: 'flex', alignContent: 'space-between'}}>
                <img src={ele.image} class="card-img-top" alt={`image ${index+1}`} style={{width: '100%', height: '150px', contain: 'cover',}}/>
                  <div className="card-body">
                    <p className="card-text">{ele.title}</p>
                    
                    <div className="d-flex justify-content-between">
                      <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                        <i
                          className="bi bi-x-lg"
                          style={{ cursor: "pointer", color: "red" }}
                          onClick={() => handleDelete(index)}
                        />
                      </OverlayTrigger>
                      <OverlayTrigger overlay={<Tooltip>Update</Tooltip>}>
                        <i
                          className="bi bi-recycle"
                          style={{ cursor: "pointer", color: "blue" }}
                          onClick={() => handleUpdate(index)}
                        />
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            placeholder="Enter title"
            aria-label="title"
            aria-describedby="basic-addon1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="file" onClick={() => document.querySelector('.input-field').click()}>
          <input type="file" accept="image/*" className="input-field" hidden onChange={handleImageUpload}/>
          {image ? <img src={image} style={{width: '101%', height: '120px', contain: 'cover', borderRadius: '10px'}}/> : <i class="bi bi-cloud-arrow-up-fill" style={{fontSize: '38px', color: '#1475cf'}}/>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
