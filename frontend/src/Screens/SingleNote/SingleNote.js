import React, { useEffect, useState } from "react";
import MainScreen from "../../components/Mainscreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesAction";
import ErrorMessage from "../../components/Errormessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";

function SingleNote({match}) {       // @deprecated: match come from react router dom for matching any value (here it is used for matchin our note._id) <- for this we used @useParams.id
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [author, setAuthor] = useState();
  const [date, setDate] = useState("");
  const [pics, setPics] = useState("");
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;  // for matching the id which will be select for editing or deleting the notes

  const noteUpdate = useSelector((state) => state.noteUpdate); // taking noteUpdate state from the redux reducer (here noteReducer.js file)
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading:loadingDelete, error: errorDelete } = noteDelete; 

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    navigate("/mynotes");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setAuthor(data.author);
      setDate(data.updatedAt);
      setPics(data.pictures);
    };

    fetching();
  }, [id, date]);   // if id and/or date is going to change then useEffect rerender the page 

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setAuthor("");
   
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(id, title, content, category, author, pics));
    if (!title || !content || !category || !author) return;

    resetHandler();
    navigate("/mynotes");
  };

// cloudnary allow us to upload images (this is the logic to upload an image over here to the cloudinary)
const postDetails = (pic) => {
   if(!pic) return;
  console.log(pic.target);
  if(pic.type === 'image/jpeg' || pic.type === 'image/png'){  
   // this is generic code while uploading photos and files with cloudinary or with anything
   const data = new FormData();      // whenever we want to uplode new file we create new FormData <-- basic html
   data.append('file', pic);   // add a new field for pics
   data.append('upload_preset', 'notezipper');  // add upload_preset
   data.append('cloud_name', 'mysuperclouds');   // my clouds name in mysuperclouds(or anything)
   fetch("https://api.cloudinary.com/v1_1/mysuperclouds/image/upload", {
     method:"post",
     body: data,
   })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setPics(data.url.toString());
    })
    .catch((err) => {
      console.log(err);
    });
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
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Content Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="category"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="author"
                placeholder="Enter Author's Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group >
           <Form.Label>Upload related Pictures(if necessory)</Form.Label>
            <Form.Control
              onChange={(e) => postDetails(e.target.files)}  // files[0] means if selected more than one image only first img will going to select 
              id="custom-file"
              type="file"
              label="Upload related Picture"
              custom="true"
            />
          </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(id)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default SingleNote;