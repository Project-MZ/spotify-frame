/**
 * downlaod base64 URI
 * @param uri base64 URI to download
 * @param name file name
 */
export const downloadURI = (uri: string, name: string): void => {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
