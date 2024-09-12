import { User } from '@/types/types'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card className='w-full'>
      <CardContent className='flex items-center p-6 flex-col justify-center'>
        <Avatar className='h-12 w-12 '>
          <AvatarImage alt={user.name} />
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className='flex-1 space-y-1 flex-col justify-center flex items-center'>
          <h3 className='text-lg font-semibold text-nowrap'>{user.name}</h3>
          <p className='text-sm text-muted-foreground'>{user.email}</p>
        </div>
        <Link to={`/users/${user.id}`} state={user}>
          <Button className='mt-2'>Details</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
