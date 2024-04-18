import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface Props {
  handleEditorChange: (editorState: EditorState) => void;
}

const MyEditor: React.FC<Props> = ({ handleEditorChange }) => {
  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    handleEditorChange(editorState);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default MyEditor;
