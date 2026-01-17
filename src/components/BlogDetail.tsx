// This component shows details of a single blog
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Blog } from "@/types/blog";

interface BlogDetailProps {
  blogId: number; // ID of the blog to display
}

export function BlogDetail({ blogId }: BlogDetailProps) {
  // Fetch single blog by ID
  const { data: blog, isLoading, isError, error } = useQuery<Blog>({
    queryKey: ["blog", blogId], // Include blogId in key for caching
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3001/blogs/${blogId}`);
      return response.data;
    },
  });

  // Loading state - show skeleton
  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-8 w-3/4" />
          <div className="flex gap-2 mt-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (isError) {
    return (
      <Card className="h-full">
        <CardContent className="p-8">
          <div className="text-center text-red-600">
            <p className="font-medium">Error loading blog</p>
            <p className="text-sm">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // No blog found
  if (!blog) {
    return (
      <Card className="h-full">
        <CardContent className="p-8">
          <p className="text-center text-gray-500">Blog not found</p>
        </CardContent>
      </Card>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate read time (average reading speed: 200 words per minute)
  const calculateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes;
  };

  // Render blog details
  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        {/* Cover Image */}
        <div className="w-full h-64 mb-6 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = "https://via.placeholder.com/800x400?text=Blog+Image";
            }}
          />
        </div>

        {/* Category badges */}
        <div className="flex gap-2 mb-4">
          {blog.category.map((cat) => (
            <Badge key={cat} className="text-sm">
              {cat}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <CardTitle className="text-3xl font-bold mb-4">{blog.title}</CardTitle>

        {/* Meta information */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground border-b pb-4">
          <span>Category: {blog.category.join(" & ")}</span>
          <span>|</span>
          <span>Date: {formatDate(blog.date)}</span>
          <span>|</span>
          <span>{calculateReadTime(blog.content)} min read</span>
        </div>
      </CardHeader>

      <CardContent>
        {/* Description */}
        <p className="text-lg text-muted-foreground mb-6 italic">
          {blog.description}
        </p>

        {/* Content */}
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap leading-relaxed">{blog.content}</p>
        </div>
      </CardContent>
    </Card>
  );
}