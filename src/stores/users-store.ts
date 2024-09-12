import { User } from '@/types/types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UsersStore {
  users: User[]
  shouldFetch: boolean
}

interface Actions {
  setUsers: (users: User[]) => void
  updateUser: (user: User) => void
  deleteUser: (userId: number) => void
  addUser: (user: User) => void
  setShouldFetch: (shouldFetch: boolean) => void
}

export const useUserStore = create<UsersStore & Actions>()(
  persist(
    (set) => ({
      users: [],
      shouldFetch: true,
      setShouldFetch: (shouldFetch: boolean) => set(() => ({ shouldFetch })),
      setUsers: (newUsers: User[]) => set(() => ({ users: newUsers })),
      updateUser: (updatedUser: User) => {
        set((state) => {
          const updatedUsers = state.users.map((user) => {
            if (user.id === updatedUser.id) {
              return updatedUser
            }
            return user
          })

          return {
            ...state,
            users: updatedUsers,
          }
        })
      },
      deleteUser: (userId: number) => {
        set((state) => {
          const updatedUsers = state.users.filter((user) => user.id !== userId)
          return {
            ...state,
            users: updatedUsers,
          }
        })
      },
      addUser: (newUser: User) => {
        set((state) => ({
          users: [...state.users, newUser],
        }))
      },
    }),

    {
      name: 'users-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
