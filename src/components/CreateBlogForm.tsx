import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CreateBlogInput } from "@/types/blog";

interface CreateBlogFormProps {
  onSuccess?: () => void;
}

export function CreateBlogForm({ onSuccess }: CreateBlogFormProps) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<CreateBlogInput>({
    title: "",
    category: [],
    description: "",
    date: new Date().toISOString(),
    coverImage: "",
    content: "",
  });

  const [categoryInput, setCategoryInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async (newBlog: CreateBlogInput) => {
      const response = await axios.post("http://localhost:3001/blogs", newBlog);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });

      setFormData({
        title: "",
        category: [],
        description: "",
        date: new Date().toISOString(),
        coverImage: "",
        content: "",
      });

      setSuccessMessage("Blog created successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);

      onSuccess?.();
    },
    onError: (error) => {
      console.error("Error creating blog:", error);
      alert(
        `Failed to create blog: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    mutation.mutate(formData);
  };

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

  const handleRemoveCategory = (cat: string) => {
    setFormData({
      ...formData,
      category: formData.category.filter((c) => c !== cat),
    });
  };

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
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
