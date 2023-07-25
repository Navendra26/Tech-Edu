import React, { useEffect } from "react";
import { Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { list10sortedNotes } from "../../actions/notesAction";
import ErrorMessage from "../../components/Errormessage";
import Loading from "../../components/Loading";
import './FrontpageContent.css';

const FrontpageContent = () => {
  const dispatch = useDispatch();

  const sorted10List = useSelector((state) => state.noteListof10);
  const { loading, notes, error } = sorted10List;

  useEffect(() => {
    dispatch(list10sortedNotes());
  }, [dispatch]);
  
  return (
    <div>
      <Stack
        gap={2}
        className="stack"
      >
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading size={80}/>}
        {notes?.map((note) => (
          <div
            className="p-2 notes"
          >
            <Link to= {`/mynotes/${note.category.replace(/ /g, '').toLowerCase()}`}>  {/* replacing spaces between words in a string */}
            {note.title}
            </Link>
            <div className="new-anime">
              NEW
            </div>
          </div>
        ))}
      </Stack>
    </div>
  );
};

export default FrontpageContent;
