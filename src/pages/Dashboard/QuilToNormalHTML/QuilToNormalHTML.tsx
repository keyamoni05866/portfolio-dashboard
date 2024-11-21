type QuilToNormalHTMLProps = {
  description: string;
  maxLength?: number;
};

const QuilToNormalHTML = ({
  description,
  maxLength,
}: QuilToNormalHTMLProps) => {
  const shortenedContent = maxLength
    ? description.substring(0, maxLength) + "..."
    : description;

  return <p dangerouslySetInnerHTML={{ __html: shortenedContent }} />;
};

export default QuilToNormalHTML;
