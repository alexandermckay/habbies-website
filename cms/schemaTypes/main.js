import { defineField, defineType } from "sanity"

export const Main = defineType(
    {
        name: 'Main',
        type: 'document',
        fields: [
            defineField({
                name: 'Author',
                to: [{ type: 'Author' }],
                type: 'reference',
                validation: v => v.required()
            }),
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
                description: 'Expected cost of the recipe',
                name: 'price',
                type: 'number',
                validation: v => v.required(),
                options: {
                    list: [
                        { title: '$0 - $20', value: 1 },
                        { title: '$20 - $40', value: 2 },
                        { title: '$40 - $60', value: 3 },
                        { title: '$60 - $80', value: 4 },
                        { title: '$80+', value: 5 },
                    ],
                }
            }),
            defineField({
                descripton: 'Optional',
                name: 'macros',
                type: 'object',
                fields: [
                    {
                        description: 'Kcal',
                        name: 'calories',
                        type: 'number'
                    },
                    {
                        description: 'Grams',
                        name: 'protein',
                        type: 'number'
                    },
                    {
                        description: 'Grams',
                        name: 'fats',
                        type: 'number'
                    },
                    {
                        description: 'Grams',
                        name: 'carbs',
                        type: 'number'
                    },
                ],
                options: { columns: 4 }
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
            defineField({
                description: 'The order here is important, the first side will be the default.',
                name: 'sides',
                type: 'array',
                of: [{ type: 'reference', to: [{ type: 'Side' }] }],
                validation: v => v.required()

            })
        ]
    }
)