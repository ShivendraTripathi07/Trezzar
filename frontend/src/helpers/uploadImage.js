const cloud_name = "djy9ppjub";
// console.log(cloud_name);
const upload_preset = "shopito";
// console.log(upload_preset);
const url = "https://api.cloudinary.com/v1_1/djy9ppjub/image/upload";

const uplpoadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("cloud_name", cloud_name);
  formData.append("upload_preset", upload_preset);
  const dataResponse = await fetch(url, {
    method: "post",
    body: formData,
  });
  return dataResponse.json();
};
export default uplpoadImage;
