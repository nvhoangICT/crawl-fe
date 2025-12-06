import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Settings, ArrowRight } from "lucide-react"

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Travel Admin System</CardTitle>
          <CardDescription>
            Hệ thống quản lý dữ liệu du lịch
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link to="/admin">
            <Button className="w-full" size="lg">
              <Settings className="mr-2 h-5 w-5" />
              Vào trang quản trị
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;