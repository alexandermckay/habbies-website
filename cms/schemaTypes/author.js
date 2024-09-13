import { defineField, defineType } from "sanity"

export const Author = defineType(
    {
        name: 'Author',
        type: 'document',
        fields: [
            defineField({
                name: 'name',
                type: 'string'
            }),
            defineField({
                name: 'picture',
                type: 'image'
            })
        ]
    }
)