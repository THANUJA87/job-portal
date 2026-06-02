import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Badge } from './ui/badge'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = [
  'Frontend Developer',
  'Backend Developer',
  'Data Science',
  'Graphic Designer',
  'Full Stack Developer',
]

const CategoryCarousel = () => {
  const dispatch = useDispatch()

  return (
    <section className="page-container py-8">
      <h2 className="mb-4 text-center text-lg font-semibold text-muted-foreground">Explore by role</h2>
      <Carousel className="mx-auto w-full max-w-3xl">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="basis-auto">
              <Badge
                variant="outline"
                className="cursor-pointer px-4 py-2 text-sm hover:border-primary hover:bg-primary/5 hover:text-primary"
                onClick={() => dispatch(setSearchedQuery(cat))}
              >
                {cat}
              </Badge>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export default CategoryCarousel
