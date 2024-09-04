import React from 'react';
import DOMPurify from 'dompurify';

interface SanitizedContentProps {
  content: string;
}

const SanitizedContent: React.FC<SanitizedContentProps> = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default SanitizedContent;
