import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { clerkClient } from '@clerk/nextjs/server'
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // This handles all the verification automatically
    const evt = await verifyWebhook(req)
    
    const { id } = evt.data
    const eventType = evt.type
    
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    
    if (eventType === 'user.created') {
      const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

      const user = {
        clerkId: id,
        email: email_addresses[0].email_address,
        username: username || '',
        firstName: first_name || '',
        lastName: last_name || '',
        photo: image_url,
      }

      console.log('Creating user with data:', user);

      try {
        const newUser = await createUser(user);
        console.log('User created successfully:', newUser);

        if (newUser) {
          const client = await clerkClient();
          await client.users.updateUserMetadata(id, {
            publicMetadata: {
              userId: newUser._id
            }
          })
          console.log('User metadata updated');
        }

        return NextResponse.json({ message: 'OK', user: newUser })
      } catch (error) {
        console.error('Error creating user:', error);
        return new Response('Error creating user', { status: 500 })
      }
    }

    if (eventType === 'user.updated') {
      const { id, image_url, first_name, last_name, username } = evt.data

      const user = {
        firstName: first_name || '',
        lastName: last_name || '',
        username: username || '',
        photo: image_url,
      }

      console.log('Updating user:', id, user);

      try {
        const updatedUser = await updateUser(id, user)
        console.log('User updated successfully:', updatedUser);
        return NextResponse.json({ message: 'OK', user: updatedUser })
      } catch (error) {
        console.error('Error updating user:', error);
        return new Response('Error updating user', { status: 500 })
      }
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data

      console.log('Deleting user:', id);

      try {
        const deletedUser = await deleteUser(id!)
        console.log('User deleted successfully:', deletedUser);
        return NextResponse.json({ message: 'OK', user: deletedUser })
      } catch (error) {
        console.error('Error deleting user:', error);
        return new Response('Error deleting user', { status: 500 })
      }
    }

    console.log(`Unhandled webhook event: ${eventType}`);
    return new Response('Webhook received', { status: 200 })
    
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}