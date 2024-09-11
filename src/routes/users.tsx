import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { User } from '@/types/types'
import UserCard from '@/components/user-card'
import LoadingSpinner from '@/components/loading-spinner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/stores/users-store'
import { Skeleton } from '@/components/ui/skeleton'
import { Link } from 'react-router-dom'

export default function UsersRoute() {
  const users = useUserStore((state) => state.users)
  const setUsers = useUserStore((state) => state.setUsers)
  const shouldFetch = useUserStore((state) => state.shouldFetch)
  const setShouldFetch = useUserStore((state) => state.setShouldFetch)

  const { isFetching, isLoading } = useQuery({
    queryKey: ['users'],
    enabled: shouldFetch,
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const usersData = (await response.json()) as User[]

      setUsers(usersData)
      setShouldFetch(false)
      return usersData
    },
  })

  const [search, setSearch] = useState<string>('')

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='space-y-4 p-8 pt-6 container mx-auto'>
      <div className='flex flex-col items-center justify-center space-y-2 md:flex-row md:justify-between '>
        <div className='flex flex-row items-center gap-2'>
          <h2 className='text-3xl font-bold tracking-tight'>Users</h2>
          {isFetching ? (
            <LoadingSpinner className='nt-green w-10 h-10' />
          ) : null}
        </div>
      </div>

      <div className='flex justify-between'>
        <Input
          placeholder='Search users'
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <Link to='/users/new'>
          <Button>Add user</Button>
        </Link>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {isLoading && !filteredUsers
          ? Array.from({ length: 4 }).map((_, index) => {
              return (
                <Skeleton className='w-full h-[200px] rounded-xl' key={index} />
              )
            })
          : null}

        {filteredUsers?.map((user) => {
          return <UserCard key={user.id} user={user} />
        })}
      </div>
    </div>
  )
}
