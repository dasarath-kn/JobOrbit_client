import React, { useState, useEffect } from 'react';
import { User } from '../../Interface/UserInterface';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';

function DocumentViewer() {
  const [pdfUrl, setPdfUrl] = useState('');
  const userDatas: User = useSelector((state: RootState) => state.user)

  useEffect(() => {
    
      try {
     setPdfUrl(userDatas?.resume_url);
      } catch (error) {
        console.error('Error fetching document URL:', error);
      }
   
  }, []);

  return (
    <div className="document-viewer">
    {pdfUrl ? (
      <iframe
        src={"https://res.cloudinary.com/dbiw9o16u/raw/upload/v1721626775/Resume/qpyqerg1fnzisbbsrg3t.pdf"}
        width="100%"
        height="600px"
        title="PDF Document"
        style={{ border: 'none' }}
      ></iframe>
    ) : (
      <p>Loading document...</p>
    )}
  </div>
  );
}

export default DocumentViewer;
