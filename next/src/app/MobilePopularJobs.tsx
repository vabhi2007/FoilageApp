import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

const MobilePopularJobs:React.FC = () => {
    return (
        <div className="flex flex-col mt-[10vw] mb-[10vw]">
            <div className="flex justify-center ml-[0vw] mb-[10vw] text-[4vw]" style={{fontFamily:"Montserrat"}}>
                Popular Locations
            </div>
            <div className="flex justify-center ">
                <Carousel className="w-full max-w-[50vw] ">
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    {/**Pictures of Different locations */}
                                    
                                </CardContent>
                            </Card>
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
      )
}

export default MobilePopularJobs 