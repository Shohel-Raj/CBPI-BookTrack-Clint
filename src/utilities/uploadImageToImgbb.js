import axios from "axios";

/**
 * Upload an image to imgbb
 * @param {string|File} image - Base64 string or File object
 * @param {string} apiKey - Your imgbb API key
 * @param {number} expiration - Expiration time in seconds (optional, default: 600)
 * @returns {Promise<Object>} - Returns the uploaded image data
 */
export const uploadImageToImgbb = async (image, apiKey, expiration = 600) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?expiration=${expiration}&key=${apiKey}`,
      formData
    );

    if (response.data && response.data.success) {
      return response.data.data; // Return the image data object
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
