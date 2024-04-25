import React, { useState, useEffect } from "react";
import { Viewer } from '@toast-ui/react-editor';
import axios from 'axios';
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { API } from "../../../../config";

interface classInfoProps {
  courseId: string;
}

function ClassInfo({courseId}: classInfoProps) {
  const [markdownUrl, setMarkdownUrl] = useState('');


  useEffect(() => {
    axios.get( API.CLASS_INFO.replace("courseId", courseId ?? "") )
    .then(response => {
      setMarkdownUrl(response.data.markdown);

    })
    .catch(error => {
      console.error("마크다운 URL을 가져오는데 실패했습니다.", error);
    });
  }, [courseId]);

  return (
    <Box h={"100%"} p={4} bg={"gray.50"} borderRadius={5}>
      {markdownUrl && (
        <Viewer 
          initialValue={markdownUrl}
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
        />
      )}
    </Box>
  );
}

export default ClassInfo;
