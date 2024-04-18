import React, { useState } from 'react';
import MyEditor from '../../components/Editor/MyEditor';
import { EditorState, convertToRaw, RawDraftContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html'; // draft-js-export-html에서 stateToHTML 함수 import
import './UploadPage.css';

const UploadPage = () => {
  const [title, setTitle] = useState('');
  const [previewContent, setPreviewContent] = useState('');

  const handleEditorChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const rawContentState: RawDraftContentState = convertToRaw(contentState);
    // Draft.js EditorState를 HTML 문자열로 변환
    const contentHTML = stateToHTML(contentState);
    // 미리보기 업데이트
    setPreviewContent(contentHTML);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Title:', title);
    console.log('Content:', previewContent);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="input-container">
        <div>
          <MyEditor handleEditorChange={handleEditorChange} />
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div className="preview-container">
          {previewContent && (
            <>
              <h2>미리보기</h2>
              <div>{previewContent}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
