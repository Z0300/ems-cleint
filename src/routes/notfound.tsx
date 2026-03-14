import { createFileRoute } from '@tanstack/react-router'
import { NotFound } from '../components/common/not-found'

export const Route = createFileRoute('/notfound')({
  component: NotFound,
})

