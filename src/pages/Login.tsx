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
    <div className="w-3xl h-full p-10 bg-amber-400">
      <div className="h-full flex centerXY bg-blue-300">
        <Card>
          <CardHeader>
            <CardTitle title="Login" />
          </CardHeader>

          <CardContent>
            <Input label="Email" placeholder="Enter your email" />
            <Input label="Password" type="password" />
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <Button variant="ghost">Cancel</Button>
            <Button>Submit</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
