import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 5,
    }),
    defineField({
      name: "url",
      type: "url",
      title: "URL",
      description: "Link to project page",
    }),
    defineField({
      name: "embedHtml",
      type: "text",
      title: "Embed HTML",
      description: "Paste iframe HTML from a trusted provider",
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
