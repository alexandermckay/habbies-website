import { defineField, defineType } from "sanity"

export const Side = defineType(
    {
        name: 'Side',
        type: 'document',
        fields: [
            defineField({
                description: 'Title of the recipe that users will see',
                name: 'title',
                type: 'string',
                validation: v => v.required()
            }),
            defineField({
                name: 'image',
                type: 'image',
                validation: v => v.required()
            }),
            defineField({
                description: 'The number of servings this recipe makes',
                name: 'servings',
                type: 'number',
                validation: v => v.positive().required()
            }),
            defineField({
                description: 'The number of minutes the recipe takes',
                name: 'time',
                type: 'number',
                validation: v => v.positive().required()
            }),
            defineField({
                name: 'ingredients',
                type: 'array',
                of: [
                    {
                        type: 'object',
                        fields: [
                            {
                                description: 'Eg: 400g, 1 tablespoon, 1 cup',
                                name: 'unit',
                                title: 'Unit',
                                type: 'string'
                            },
                            {

                                description: 'Eg: eggs, parmesan cheese, sweet potato',
                                name: 'ingredient',
                                title: 'Ingredient',
                                type: 'string'
                            },

                        ],
                        preview: {
                            select: {
                                title: 'ingredient',
                                subtitle: 'unit'
                            }
                        },

                    }
                ],

            }),
            defineField({
                description: 'Separate each step of the recipe with a newline (press the enter key).',
                name: 'recipe',
                type: 'text',
                validation: v => v.required()
            }),
            defineField({
                description: 'Optional: add tips and tricks',
                name: 'tips',
                type: 'text'
            }),
        ]
    }
)