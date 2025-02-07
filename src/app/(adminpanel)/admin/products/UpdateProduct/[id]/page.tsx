"use client";
import { useState } from "react";
import axios from "axios";

const AddProductPage = ({params}:any) => {

  console.log(params.id)

  const [name, setProductName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  // Form Submit Handler
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    let data = {
      description,
      shortDescription,
      name,
      tags,
      price
    }


    try {
      console.log("------++++",data)
      const response = await axios.post("/api/updateProduct", [params.id,data]);

      console.log("Product Added:", response);
    } catch (error) {
      console.error("Error adding product:", error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-[1440px] mx-auto h-auto bg-slate-100">
      <h1 className="text-3xl text-center pt-6">Update Product Here</h1>

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

        <button type="submit" className="bg-black w-[400px] h-[40px] rounded-[5px] mb-10 text-white">
          {loading ? "Update Product..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
