import { Field } from 'payload'

export const sharedFields: Field[] = [
  {
    name: 'moduleId',
    type: 'text',
    label: 'Module ID',
  },
  {
    name: 'backgroundColor',
    type: 'radio',
    label: 'Background Color',
    options: [
      {
        label: 'Beige (dark)',
        value: 'beige-dark',
      },
      {
        label: 'Beige (light)',
        value: 'beige-light',
      },
      {
        label: 'Beige (very dark)',
        value: 'beige-very-dark',
      },
      {
        label: 'White',
        value: 'white',
      },
      {
        label: 'Black',
        value: 'black',
      },
    ],
    defaultValue: 'beige-dark',
    required: true,
  },
]
