import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Blog } from "@/types/blog";

interface BlogListProps {
  onSelectBlog: (id: number) => void;
  selectedBlogId: number | null;
}

export function BlogList({ onSelectBlog, selectedBlogId }: BlogListProps) {
  const { data: blogs, isLoading, isError, error } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3001/blogs");
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
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

  if (isError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 font-medium">Error loading blogs</p>
        <p className="text-red-500 text-sm">
          {error instanceof Error ? error.message : "An error occurred"}
        </p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No blogs found. Create your first blog!</p>
      </div>
    );
  }

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
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
  };

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
              <div className="flex gap-2 flex-wrap">
                {blog.category.map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
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
