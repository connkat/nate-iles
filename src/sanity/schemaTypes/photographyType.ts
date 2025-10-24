import { defineField, defineType } from "sanity";

export const photographyType = defineType({
  name: "photography",
  title: "Photography",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Cover Image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
});
