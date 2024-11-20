export const ImageUploadFunc = async (file: File) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=b3860cca4aec21de3e8b33a0bbbc56d5`,
    { method: "POST", body: formData }
  );

  if (!response.ok) {
    throw new Error("Image Upload Failed");
  }
  const data = await response.json();

  return data.data.url;
};
