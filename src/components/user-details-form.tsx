import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { User } from '@/types/types'
import { useUserStore } from '@/stores/users-store'
import { useNavigate } from 'react-router-dom'

const profileFormSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().or(z.string().email()),
  phone: z.string(),
  website: z.string(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface UserDetailsFormProps {
  user?: User
  isNew?: boolean
}

export function UserDetailsForm({ user, isNew }: UserDetailsFormProps) {
  const users = useUserStore((state) => state.users)
  const updateUser = useUserStore((state) => state.updateUser)
  const addUser = useUserStore((state) => state.addUser)
  const deleteUser = useUserStore((state) => state.deleteUser)
  const navigate = useNavigate()

  const lastUserId = users.reduce(
    (highestId, user) => (user.id > highestId ? user.id : highestId),
    0
  )

  const defaultValues: Partial<ProfileFormValues> = {
    name: user?.name ?? '',
    username: user?.username ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    website: user?.website ?? '',
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  function onSubmit(data: ProfileFormValues) {
    if (isNew) {
      const newUser: User = {
        ...data,
        id: lastUserId + 1,
      }
      addUser(newUser)
      navigate('/')
    } else {
      const updatedUser: User = {
        ...data,
        id: user?.id as number,
      }
      updateUser(updatedUser)
    }

    toast({
      title: isNew ? 'User created successfully' : 'User updated successfully',
    })
  }

  function onDeleteUser(userId: number) {
    deleteUser(userId)
    navigate('/')
    toast({
      title: 'User deleted successfully',
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Name' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='Username' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder='Phone' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='website'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder='Website' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-2'>
          <Button type='submit'>
            {isNew ? 'Add new user' : 'Update user'}
          </Button>

          {!isNew ? (
            <Button
              variant={'destructive'}
              onClick={() => onDeleteUser(user?.id as number)}>
              Delete user
            </Button>
          ) : null}
        </div>
      </form>
    </Form>
  )
}
