import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">John Lankford</p>
          <p className="text-sm text-muted-foreground">
            john.lankford@example.com
          </p>
        </div>
        <div className="ml-auto font-medium">+$250.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sophie Dante</p>
          <p className="text-sm text-muted-foreground">
            sophie.dante@example.com
          </p>
        </div>
        <div className="ml-auto font-medium">+$150.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Michael Chen</p>
          <p className="text-sm text-muted-foreground">
            michael.chen@example.com
          </p>
        </div>
        <div className="ml-auto font-medium">+$350.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Olivia Martinez</p>
          <p className="text-sm text-muted-foreground">
            olivia.martinez@example.com
          </p>
        </div>
        <div className="ml-auto font-medium">+$450.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>RJ</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Raj Joshi</p>
          <p className="text-sm text-muted-foreground">raj.joshi@example.com</p>
        </div>
        <div className="ml-auto font-medium">+$200.00</div>
      </div>
    </div>
  )
}