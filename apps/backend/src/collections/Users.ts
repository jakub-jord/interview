import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'createdAt'],
  },
  access: {
    // Allow anyone to create the first user (for setup)
    create: () => true,
    // Only authenticated users can read users
    read: ({ req: { user } }) => !!user,
    // Only admins can update users
    update: ({ req: { user } }) => user?.role === 'admin',
    // Only admins can delete users
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'operator',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Operator', value: 'operator' },
        { label: 'Viewer', value: 'viewer' },
      ],
      admin: {
        description: 'User role determines access permissions',
      },
    },
    {
      name: 'facilityName',
      type: 'text',
      admin: {
        description: 'The facility this user is associated with',
      },
    },
  ],
}

export default Users

