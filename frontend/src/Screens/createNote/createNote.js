// react-markdown -> whenever we type anything it helps to convert file into markdown file like README.md file

import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Form, FormSelect } from "react-bootstrap";
import Mainscreen from "../../components/Mainscreen";
import ErrorMessage from "../../components/Errormessage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesAction";
import Loading from "../../components/Loading";
import JoditEditor from 'jodit-react';
// import ReactMarkdown from 'react-markdown';

function CreateNote() {
  const editor = useRef(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [elements, setElements] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteCreate = useSelector((state) => state.noteCreate); // taking state from noteReducer
  const { loading, error } = noteCreate;

  const userLogin = useSelector((state) => state.userLogin); //using this state becoz we want to go on login screen page whenever user logout
  const { userInfo } = userLogin;
  function wantReset() {
    if (window.confirm("Do you want to Reset?")) {
      resetHandler();
    }
  }
  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setAuthor("");
    setElements([]);
  };
  useEffect(() => {}, []);
  const createdBy = userInfo.name; // Replace with user info

  const submitHandler = (e) => {
    e.preventDefault();

    // Dispatch and other submission logic here
    dispatch(createNoteAction(title, category, author, elements, createdBy));
    if (!title || elements.length === 0 || !category || !author) return;

    console.log(elements);
    resetHandler();
    navigate(-1);
  };

  const addElement = (elementType) => {
    setElements([
      ...elements,
      { id: Date.now(), type: elementType, value: "", caption: "" },
    ]);
  };

  const deleteElement = (elementId) => {
    const updatedElements = elements.filter(
      (element) => element.id !== elementId
    );
    setElements(updatedElements);
  };

  const updateImageValue = async (editor, file) => {
    if (!file) {
      return;
    }

    try {
      // Your image upload logic using Cloudinary or any other service
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'notezipper');
      data.append('cloud_name', 'mysuperclouds');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/mysuperclouds/image/upload',
        {
          method: 'post',
          body: data,
        }
      );

      const responseData = await response.json();
      const imageUrl = responseData.url.toString();

      // Insert the image URL into the Jodit editor
      // const editor = joditRef.current.editor;
      if (editor) {
        editor.selection.insertHTML(`<img src="${imageUrl}" alt="Uploaded Image">`);
      } else {
        console.error('Editor is not available');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const config = {
    // Your Jodit editor configuration
    // buttons: ['bold', 'italic', 'image'],
    extraButtons: [
      {
        name: 'image',
        iconURL: 'https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png', // Replace with your icon
        exec: async (editor) => {
          // Trigger file selection dialog
          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = 'image/*';
          fileInput.onchange = (e) => {
            const file = e.target.files[0];
            updateElementImageValue(editor, file);
            // console.log(editor);
          };
          fileInput.click();
        },
      },
    ],
  };

   const updateElementImageValue = async (elementId, file) => {
    if (!file) {
      return;
    }

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "mysuperclouds");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/mysuperclouds/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      const responseData = await response.json();
      const imageUrl = responseData.url.toString();
      // Here, you need to update the state for the specific image element
      // You can do this by mapping through the elements and finding the element with the specific id
      const updatedElements = elements.map((element) => {
        if (element.id === elementId) {
          return { ...element, value: imageUrl };
        }
        return element;
      });

      setElements(updatedElements);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
 
  const updateElementValue = (elementId, value) => {
    const updatedElements = elements.map((element) => {
      if (element.id === elementId) {
        return { ...element, value };
      }
      return element;
    });
    setElements(updatedElements);
  };

  const updateElementCaption = (elementId, caption) => {
    const updatedElements = elements.map((element) => {
      if (element.id === elementId) {
        return { ...element, caption };
      }
      return element;
    });
    setElements(updatedElements);
  };

  return (
    <Mainscreen title="CREATE A CONTENT">
      <Card>
        <Card.Header>Create a new Content</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            <Form.Group controlId="title">
              <Form.Label>
                Title<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="author">
              <Form.Label>
                Author Name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="author"
                value={author}
                placeholder="Enter the Author Name"
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>
                Category<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <br></br>

              <FormSelect style={{width:"100%", height:36, borderRadius:5}} onChange={(e) => setCategory(e.target.value)}>
                <option>Choose the category for this content </option>
                <option value="Technical Skills">Technical Skills</option>
                <option value="Programming">Programming</option>
                <option value="Business Leader">Business Leader</option>
                <option value="Group Leader">Group Leader</option>
                <option value="Effective Communication">
                  Effective Communication
                </option>
                <option value="Motivation">Motivation</option>
                <option value="Manager">Manager</option>
                <option value="CS Fundamental">CS Fundamental</option>
              </FormSelect>
            </Form.Group>

            {elements.map((element) => (
              <React.Fragment key={element.id}>
                <>
                  {element.type === "paragraph" && (
                    <Form.Group controlId={`content-${element.id}`}>
                      <Form.Label>
                        <b>Paragraph</b>
                      </Form.Label>
                      {/*  <Form.Control
                      as="textarea"
                      value={element.value}
                      placeholder="Enter the content"
                      rows={4}
                      onChange={(e) =>
                        updateElementValue(element.id, e.target.value)
                      }
                    />
                { (element.value !== "") && 
                 ( <Card>
                    <Card.Header>Content Preview</Card.Header>
                    <Card.Body>
                      <ReactMarkdown>{element.value}</ReactMarkdown>
                    </Card.Body>
                  </Card>)
                } */}
                      <JoditEditor
                        ref={editor}
                        value={element.value}
                        // config={config}
                        onBlur={(newContent) => updateElementValue(element.id, newContent)} 
                      />
                    </Form.Group>
                  )}
                </>
                {element.type === "image" && (
                  <Form.Group controlId={`image-${element.id}`}>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        updateElementImageValue(element.id, e.target.files[0])
                      }
                      custom="true"
                    />
                    <Form.Label>Image Caption</Form.Label>
                    <Form.Control
                      type="text"
                      value={element.caption}
                      placeholder="Enter the image caption"
                      onChange={(e) =>
                        updateElementCaption(element.id, e.target.value)
                      }
                    />
                    {element.value !== "" && (
                      <Card>
                        <Card.Header>Image Preview</Card.Header>
                        <img
                          src={element.value}
                          alt="Image Preview"
                          style={{ maxWidth: "300px" }}
                        />
                      </Card>
                    )}
                  </Form.Group>
                )}
                {/* {element.type === "video" && (
                  <Form.Group controlId={`video-${element.id}`}>
                    <Form.Label>YouTube Video URL</Form.Label>
                    <Form.Control
                      type="text"
                      value={element.value}
                      placeholder="Enter the YouTube video URL"
                      onChange={(e) =>
                        updateElementValue(element.id, e.target.value)
                      }
                    />
                    <Form.Label>Video Caption</Form.Label>
                    <Form.Control
                      type="text"
                      value={element.caption}
                      placeholder="Enter the video caption"
                      onChange={(e) =>
                        updateElementCaption(element.id, e.target.value)
                      }
                    />
                  </Form.Group>
                )} */}
                <Button
                  variant="danger"
                  className="bg-danger"
                  onClick={() => {if(window.confirm("Do you want to Delete?")) deleteElement(element.id)}}
                >
                  <i className="fa fa-multiply"></i> REMOVE
                </Button>
              </React.Fragment>
            ))}
            <br />
            <br />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button variant="success" onClick={() => addElement("paragraph")}>
                <i className="fa fa-plus"></i>Text
              </Button>
              <Button variant="success" onClick={() => addElement("image")}>
                <i className="fa fa-plus"></i>image
              </Button>
             {/*  <Button variant="success" onClick={() => addElement("video")}>
                <i className="fa fa-link"></i> Add YouTube Video
              </Button> */}
            </div>

            <Button type="submit" variant="primary">
              Create Your Content
            </Button>
            <Button className="mx-2" onClick={wantReset} variant="danger">
              Reset Fields
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Creating by - {createdBy} <br />
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
        
    </Mainscreen>
  );
}

export default CreateNote;
