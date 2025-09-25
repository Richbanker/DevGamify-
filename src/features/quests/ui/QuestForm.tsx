import { useForm } from 'react-hook-form'
import type { infer as ZodInfer } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../../../shared/ui/Input'
import { Select } from '../../../shared/ui/Select'
import { Button } from '../../../shared/ui/Button'
import { defaultXpByDifficulty, questSchema } from '../model/types'
import type { Quest } from '../model/types'

const formSchema = questSchema.pick({
  title: true,
  description: true,
  type: true,
  category: true,
  difficulty: true,
  rewardXp: true,
})
type FormValues = ZodInfer<typeof formSchema>

type Props = {
  initial?: Partial<FormValues>
  onSubmit: (data: FormValues) => void
}

export function QuestForm({ initial, onSubmit }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'daily',
      category: 'general',
      difficulty: 'easy',
      rewardXp: defaultXpByDifficulty('easy'),
      ...initial,
    },
  })

  form.watch('difficulty')
  form.watch('rewardXp')

  return (
    <form onSubmit={form.handleSubmit((v) => onSubmit(v))} className="space-y-3">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm">
          Название
        </label>
        <Input
          id="title"
          {...form.register('title')}
          aria-invalid={!!form.formState.errors.title}
        />
      </div>
      <div>
        <label htmlFor="description" className="mb-1 block text-sm">
          Описание
        </label>
        <Input id="description" {...form.register('description')} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="type" className="mb-1 block text-sm">
            Тип
          </label>
          <Select id="type" {...form.register('type')}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="custom">Custom</option>
          </Select>
        </div>
        <div>
          <label htmlFor="category" className="mb-1 block text-sm">
            Категория
          </label>
          <Input id="category" {...form.register('category')} placeholder="react, ts, ui..." />
        </div>
        <div>
          <label htmlFor="difficulty" className="mb-1 block text-sm">
            Сложность
          </label>
          <Select
            id="difficulty"
            {...form.register('difficulty')}
            onChange={(e) => {
              const value = e.target.value as Quest['difficulty']
              form.setValue('difficulty', value)
              form.setValue('rewardXp', defaultXpByDifficulty(value))
            }}
          >
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
          </Select>
        </div>
        <div>
          <label htmlFor="xp" className="mb-1 block text-sm">
            XP
          </label>
          <Input id="xp" type="number" {...form.register('rewardXp', { valueAsNumber: true })} />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  )
}
