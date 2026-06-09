

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export function TextCardSkeleton() {
  return (
    
    <Card className="flex flex-col justify-between h-full w-full border border-gray-200">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-3/4 mb-1.5" />
        <Skeleton className="h-4 w-1/2" />
        
        <div className="flex flex-wrap gap-2 mt-2">
          <Skeleton className="h-5 w-20 rounded-full" /> 
          <Skeleton className="h-5 w-28 rounded-full" /> 
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col items-center justify-center flex-1 px-6 py-8 min-h-[140px]">
        <Skeleton className="h-20 w-16 rounded-md" />
      </CardContent>
      
      <CardFooter className="pt-2">
        <div className="flex flex-col gap-1.5 w-full">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </CardFooter>
      
    </Card>
  )
}