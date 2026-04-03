import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/card";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function Login() {
  return (
    <div className="w-4xl h-full p-10 bg-background">
      <div className="h-full flex centerXY">
        <Card className="h-100 bg-primary">
          <CardHeader className="h-24 py-10 px-4">
            <CardTitle
              title="Login"
              className="text-background text-3xl font-semibold"
            />
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              className="placeholder:text-background text-background"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              className="placeholder:text-background text-background"
            />
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <Button className="text-primary bg-tertiary/80">Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
