import { tableSchema } from '@nozbe/watermelondb/Schema';

export const reminderSchema = tableSchema({
    name: 'reminder',
    columns: [        
        {
            name: 'username',
            type: 'string'
        },
        {
            name: 'email',
            type: 'string'
        },
        {
            name: 'title',
            type: 'string'
        },
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'amount',
            type: 'number'
        },
        {
            name: 'reminder_date',
            type: 'string'
        },
        {
            name: 'due_date',
            type: 'string'
        },
        {
            name: 'payment_proof',
            type: 'string'
        },
        
    ]

})