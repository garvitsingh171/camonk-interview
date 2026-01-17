import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogList } from "@/components/BlogList";
import { BlogDetail } from "@/components/BlogDetail";
import { CreateBlogForm } from "@/components/CreateBlogForm";

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar
        onCreateClick={() => {
          setShowCreateForm(!showCreateForm);
          setSelectedBlogId(null);
        }}
        showCreateForm={showCreateForm}
      />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {showCreateForm ? (
          <div className="max-w-2xl mx-auto">
            <CreateBlogForm
              onSuccess={() => {
                setShowCreateForm(false);
                setSelectedBlogId(null);
              }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <BlogList
                onSelectBlog={setSelectedBlogId}
                selectedBlogId={selectedBlogId}
              />
            </div>

            <div className="lg:col-span-2">
              {selectedBlogId ? (
                <BlogDetail blogId={selectedBlogId} />
              ) : (
                <div className="h-full flex items-center justify-center bg-white rounded-lg border-2 border-dashed p-8 sm:p-12">
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                      Select a blog to read
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base">
                      Click on any blog from the list to view its full content
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
