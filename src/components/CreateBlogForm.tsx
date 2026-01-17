// This component is a form to create new blogs
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CreateBlogInput } from "@/types/blog";

interface CreateBlogFormProps {
  onSuccess?: () => void; // Callback when blog is created successfully
}

export function CreateBlogForm({ onSuccess }: CreateBlogFormProps) {
  // queryClient is used to invalidate cache after creating blog
  const queryClient = useQueryClient();

  // Form state - stores what user types
  const [formData, setFormData] = useState<CreateBlogInput>({
    title: "",
    category: [],
    description: "",
    date: new Date().toISOString(),
    coverImage: "",
    content: "",
  });

  // For category input
  const [categoryInput, setCategoryInput] = useState("");

  // useMutation hook for creating blog
  const mutation = useMutation({
    mutationFn: async (newBlog: CreateBlogInput) => {
      // POST request to create blog
      const response = await axios.post("http://localhost:3001/blogs", newBlog);
      return response.data;
    },
    onSuccess: () => {
      // After success, invalidate the blogs query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      
      // Reset form
      setFormData({
        title: "",
        category: [],
        description: "",
        date: new Date().toISOString(),
        coverImage: "",
        content: "",
      });
      
      // Call parent callback if provided
      onSuccess?.();
      
      alert("Blog created successfully!");
    },
    onError: (error) => {
      console.error("Error creating blog:", error);
      alert("Failed to create blog. Please try again.");
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    
    // Validation
    if (!formData.title.trim()) {
      alert("Please enter a title");
      return;
    }
    if (formData.category.length === 0) {
      alert("Please add at least one category");
      return;
    }
    if (!formData.description.trim()) {
      alert("Please enter a description");
      return;
    }
    if (!formData.content.trim()) {
      alert("Please enter content");
      return;
    }

    // Submit the form
    mutation.mutate(formData);
  };

  // Add category from input
  const handleAddCategory = () => {
    const trimmed = categoryInput.trim().toUpperCase();
    if (trimmed && !formData.category.includes(trimmed)) {
      setFormData({
        ...formData,
        category: [...formData.category, trimmed],
      });
      setCategoryInput("");
    }
  };

  // Remove category
  const handleRemoveCategory = (cat: string) => {
    setFormData({
      ...formData,
      category: formData.category.filter((c) => c !== cat),
    });
  };

  // Handle Enter key in category input
  const handleCategoryKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCategory();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Blog</CardTitle>
        <CardDescription>
          Fill in the details below to create a new blog post
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          {/* Category Input */}
          <div className="space-y-2">
            <Label htmlFor="category">Categories *</Label>
            <div className="flex gap-2">
              <Input
                id="category"
                placeholder="Enter category (e.g., FINANCE)"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                onKeyPress={handleCategoryKeyPress}
              />
              <Button
                type="button"
                onClick={handleAddCategory}
                variant="secondary"
              >
                Add
              </Button>
            </div>
            {/* Display added categories */}
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.category.map((cat) => (
                <Badge
                  key={cat}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleRemoveCategory(cat)}
                >
                  {cat} ×
                </Badge>
              ))}
            </div>
            {formData.category.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Click "Add" to add categories
              </p>
            )}
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Brief summary of your blog"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              required
            />
          </div>

          {/* Cover Image URL Input */}
          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.coverImage}
              onChange={(e) =>
                setFormData({ ...formData, coverImage: e.target.value })
              }
            />
            <p className="text-xs text-muted-foreground">
              Optional: Enter a URL for the cover image
            </p>
          </div>

          {/* Content Input */}
          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              placeholder="Write your blog content here..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={10}
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create Blog"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}