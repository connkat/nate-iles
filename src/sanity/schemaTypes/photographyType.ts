import {defineField, defineType} from 'sanity'

export const photographyType = defineType({
  name: 'photography',
  title: 'Photography',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'description',
              type: 'text',
            }),
          ],
        },
      ],
    }),
  ],
})
