import { atom } from 'jotai'

export const workspace$ = atom<string | string[] | null>('')
