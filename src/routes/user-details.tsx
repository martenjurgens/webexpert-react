import { BackButton } from '@/components/back-button'
import { UserDetailsForm } from '@/components/user-details-form'
import { User } from '@/types/types'
import { Link, useLocation } from 'react-router-dom'

export default function UserDetailsRoute() {
  const location = useLocation()
  const user: User = location.state

  return (
    <div className='space-y-4 p-8 pt-6 container mx-auto'>
      <div className='flex flex-col items-center justify-center space-y-2 md:flex-row md:justify-between '>
        <div className='flex flex-row items-center gap-2'>
          <h2 className='text-3xl font-bold tracking-tight'>User details</h2>
        </div>
      </div>

      <div className='flex justify-end'>
        <Link to='/'>
          <BackButton />
        </Link>
      </div>

      {user ? <UserDetailsForm user={user} /> : null}
    </div>
  )
}
