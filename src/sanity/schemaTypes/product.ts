import { Rule } from "sanity";

export const product = {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
        validation: (rule:Rule) => rule.required(),
      },
      {
        name: "description",
        title: "Description",
        type: "text",
        validation: (rule:Rule) => rule.required(),
      },
      {
        name: "productImage",
        title: "Product Image",
        type: "image",
        validation: (rule:Rule) => rule.required(),
      },
      {
        name: "price",
        title: "Price",
        type: "number",
        validation: (rule:Rule) => rule.required(),
      },
      {
        name: "tags",
        title: "Tags",
        type: "array",
        of: [{ type: "string" }],
      },
      {
        name: "discountPercentage",  // Fixed typo here
        title: "Discount Percentage",
        type: "number",
      },
      {
        name: "isNew",
        title: "New Badge",
        type: "boolean",
      },
    ],
  };
  