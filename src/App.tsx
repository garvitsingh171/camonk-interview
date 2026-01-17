// Main App component - controls the layout and state
import { useState } from "react";
import { BlogList } from "@/components/BlogList";
import { BlogDetail } from "@/components/BlogDetail";
import { CreateBlogForm } from "@/components/CreateBlogForm";
import { Button } from "@/components/ui/button";

function App() {
  // State to track which blog is selected (null = none selected)
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  
  // State to control whether create form is visible
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">CA Monk Blog</h1>
              <p className="text-muted-foreground">
                Stay updated with the latest trends in finance, accounting, and career growth
              </p>
            </div>
            <Button
              onClick={() => setShowCreateForm(!showCreateForm)}
              variant={showCreateForm ? "outline" : "default"}
            >
              {showCreateForm ? "View Blogs" : "Create New Blog"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {showCreateForm ? (
          // Show create form
          <div className="max-w-2xl mx-auto">
            <CreateBlogForm
              onSuccess={() => {
                setShowCreateForm(false);
                setSelectedBlogId(null);
              }}
            />
          </div>
        ) : (
          // Show blog list and detail in two columns
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Blog List (takes 1 column on large screens) */}
            <div className="lg:col-span-1">
              <BlogList
                onSelectBlog={setSelectedBlogId}
                selectedBlogId={selectedBlogId}
              />
            </div>

            {/* Right Panel - Blog Detail (takes 2 columns on large screens) */}
            <div className="lg:col-span-2">
              {selectedBlogId ? (
                <BlogDetail blogId={selectedBlogId} />
              ) : (
                <div className="h-full flex items-center justify-center bg-white rounded-lg border-2 border-dashed p-12">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Select a blog to read
                    </h3>
                    <p className="text-gray-500">
                      Click on any blog from the list to view its full content
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;