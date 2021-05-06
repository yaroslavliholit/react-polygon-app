import { useCallback, useEffect, useMemo, useState } from 'react';

const MAX_TEXT_SIZE = 250;

const useTrimText = (text: string) => {
  const shouldTrimText = text.length > MAX_TEXT_SIZE;

  const [trimmedText, setTrimmedText] = useState(text);
  const [isTextTrimmed, setIsTextTrimmed] = useState(shouldTrimText);

  const trimText = useCallback(() => {
    const updatedString = text.substring(0, MAX_TEXT_SIZE);
    setTrimmedText(updatedString);
    setIsTextTrimmed(true);
  }, [text]);

  const handleToddleCropText = useCallback(() => {
    setIsTextTrimmed((prevState) => !prevState);
    if (isTextTrimmed) {
      setTrimmedText(text);
    }
  }, [isTextTrimmed, text]);

  useEffect(() => {
    if (isTextTrimmed) {
      trimText();
    }
  }, [isTextTrimmed, trimText]);

  return useMemo(
    () => ({
      isTextTrimmed,
      shouldTrimText,
      trimmedText,
      handleToddleCropText,
    }),
    [isTextTrimmed, shouldTrimText, trimmedText, handleToddleCropText]
  );
};

export default useTrimText;
