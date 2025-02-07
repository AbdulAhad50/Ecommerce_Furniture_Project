"use client";
import { useState } from "react";
import axios from "axios";

const AddProductPage = () => {
  const [name, setProductName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);

  // Form Submit Handler
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    // FormData for sending files
    const formData = new FormData();
    formData.append("title", name);
    formData.append("shortDescription", shortDescription);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("tags", tags);

    let data = {
      description,
      shortDescription,
      images,
      name,
      tags,
      price
    }


    if (images) {
      Array.from(images).forEach((image) => {
        formData.append("images", image);
      });
    }

    try {
      console.log("------++++",data)
      const response = await axios.post("/api/addProduct", data);

      console.log("Product Added:", response);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-[1440px] mx-auto h-auto bg-slate-100">
      <h1 className="text-3xl text-center pt-6">Add Product Here</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-[50%] mx-auto mt-8">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setProductName(e.target.value)}
          className="rounded-[5px] pl-6 outline-none w-[400px] h-[45px]"
        />

        <input
          type="text"
          placeholder="Short Description"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="rounded-[5px] pl-6 outline-none w-[400px] h-[45px]"
        />

        <textarea
          placeholder="Write Product Description Here"
          value={description}
          onChange={(e) => setLongDescription(e.target.value)}
          className="rounded-[5px] pl-6 pt-4 outline-none w-[400px] h-[300px]"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="rounded-[5px] pl-6 outline-none w-[400px] h-[45px]"
        />

        <input
          type="text"
          placeholder="tags #separate with space button"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="rounded-[5px] pl-6 w-[400px] h-[45px] outline-none"
        />

        <label htmlFor="images">
          Select Images: <span className="text-gray-300">you can select multiple images</span>
        </label>
        <input
          type="file"
          className="rounded-[5px] w-[400px] h-[45px] outline-none"
          accept="image/*"
          multiple
          onChange={(e) => setImages(e.target.files)}
        />

        <button type="submit" className="bg-black w-[400px] h-[40px] rounded-[5px] mb-10 text-white">
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
