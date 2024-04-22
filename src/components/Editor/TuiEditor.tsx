import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor, Viewer,  } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'prismjs/themes/prism.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs';

type Props = {
  editorRef: React.RefObject<Editor> | null;
  imageHandler: (blob: File, callback: typeof Function) => void;
  content?: string;
  
};

const Toorbar = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ];


function TuiEditor({ content, editorRef, imageHandler }: Props) {
  return (
    <>
      <Editor
        initialValue={content ?? ' '}
        initialEditType='markdown'
        previewStyle={window.innerWidth > 10000 ? 'vertical' : 'tab'}
        autofocus={false}
        ref={editorRef}
        hideModeSwitch={true}
        theme='dark'
        height="850px"
        usageStatistics={true}
        useCommandShortcut={true}
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        hooks={{ addImageBlobHook: imageHandler }}
        
        // placeholder='강의 소개를 입력해주세요'
      />
    

      </>
  );
}

export default TuiEditor;