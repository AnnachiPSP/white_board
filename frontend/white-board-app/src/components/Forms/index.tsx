// Forms/index.tsx
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Forms = ({token}) => {
  
  const isRun = useRef(false);
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if(isRun.current) return;
    isRun.current = true;

    const config = {
      headers:{
        authorization: `Bearer ${token}`,
      },
    };

    axios.get("/main", config)
    .then((response) => {
      setHtmlContent(response.data);
    })
    .catch((error) => {
      console.error("Error fetching HTML:", error);
    });
  }, []);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default Forms;
