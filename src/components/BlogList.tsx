// This component shows all blogs in a list
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Blog } from "@/types/blog";

// Props = properties that this component receives from parent
interface BlogListProps {
  onSelectBlog: (id: number) => void; // Function to call when blog is clicked
  selectedBlogId: number | null; // Which blog is currently selected
}

export function BlogList({ onSelectBlog, selectedBlogId }: BlogListProps) {
  // useQuery hook fetches data and manages loading/error states
  const { data: blogs, isLoading, isError, error } = useQuery<Blog[]>({
    queryKey: ["blogs"], // Unique identifier for this query
    queryFn: async () => {
      // This function actually fetches the data
      const response = await axios.get("http://localhost:3001/blogs");
      return response.data;
    },
  });

  // Show loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Show 3 skeleton cards */}
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  // Show error message if something went wrong
  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 font-medium">Error loading blogs</p>
        <p className="text-red-500 text-sm">{error.message}</p>
      </div>
    );
  }

  // Show message if no blogs exist
  if (!blogs || blogs.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No blogs found. Create your first blog!</p>
      </div>
    );
  }

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  // Render the list of blogs
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
      {blogs.map((blog) => (
        <Card
          key={blog.id}
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedBlogId === blog.id ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => onSelectBlog(blog.id)}
        >
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-2">
                {blog.category.map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDate(blog.date)}
              </span>
            </div>
            <CardTitle className="text-xl">{blog.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {blog.description}
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}