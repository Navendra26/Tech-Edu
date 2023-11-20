import React, { useEffect, useState } from "react";
import MainScreen from "../../components/Mainscreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesAction";
import ErrorMessage from "../../components/Errormessage";
import Loading from "../../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";

function SingleNote() {
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [elements, setElements] = useState([]);
  const [date, setDate] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id; // for matching the id which will be select for editing or deleting the notes

  const noteUpdate = useSelector((state) => state.noteUpdate); // taking noteUpdate state from the redux reducer (here noteReducer.js file)
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    navigate('/contents');
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${id}`);

      setTitle(data.title);
      setCategory(data.category);
      setAuthor(data.author);
      setElements(data.elements);
      setDate(data.updatedAt);
      
    };

    fetching();
  }, [id, date]); // if id and/or date is going to change then useEffect rerender the page
  function wantReset(){
    if (window.confirm("Do you want to Reset?")) {
      resetHandler();
    }
  }
  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setAuthor("");
    setElements([]);
    setDate("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(id, title, category, author, elements));
    if (!title || elements === 0 || !category || !author) return;

    resetHandler();
    navigate("/contents");
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

  return (
    <MainScreen title="Edit Content">
      <Card>
        <Card.Header>Edit your Content</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title*</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category*</Form.Label>
              <Form.Control
                type="category"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="author">
              <Form.Label>Author Name*</Form.Label>
              <Form.Control
                type="author"
                value={author}
                placeholder="Enter the Author Name"
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>

            {elements.map((element) => (
              <React.Fragment key={element.id}>
                {element.type === "paragraph" && (
                
                <JoditEditor
                  //ref={editor}
                  value={element.value}
                  // config={config}
                  onBlur={(newContent) => updateElementValue(element.id, newContent)} 
                />
                )}
                
                {element.type === "image" && (
                  <Form.Group controlId={`image-${element.id}`}>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        updateElementImageValue(element.id, e.target.files[0])
                      }
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
                     {(element.value !== "") && (
                       <Card>
                         <h4>Image Preview</h4>
                       <img
                           src={element.value}
                           alt="Image Preview"
                           style={{ maxWidth: '300px' }}
                       />
                       </Card>
                 )}
                  </Form.Group>
                )}
              
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
                <i className="fa fa-plus"></i>paragraph
              </Button>
              <Button variant="success" onClick={() => addElement("image")}>
                <i className="fa fa-plus"></i>image
              </Button>
            </div>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Your Content
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(id)}
            >
              Delete Content
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 19)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleNote;
