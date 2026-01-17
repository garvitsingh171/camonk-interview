import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onCreateClick: () => void;
  showCreateForm: boolean;
}

export function Navbar({ onCreateClick, showCreateForm }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-20 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CA</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CA Monk</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Finance & Career</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-gray-600 hover:text-primary transition-colors">Home</a>
            <a href="#blogs" className="text-gray-600 hover:text-primary transition-colors">Blogs</a>
            <a href="#about" className="text-gray-600 hover:text-primary transition-colors">About</a>
            <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
          </nav>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <Button onClick={onCreateClick} variant={showCreateForm ? "outline" : "default"} size="sm">
              {showCreateForm ? "View Blogs" : "Create New Blog"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t pb-4">
            <nav className="flex flex-col gap-3 pt-4">
              <a href="#home" className="text-gray-600 hover:text-primary px-2 py-2" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#blogs" className="text-gray-600 hover:text-primary px-2 py-2" onClick={() => setMobileMenuOpen(false)}>Blogs</a>
              <a href="#about" className="text-gray-600 hover:text-primary px-2 py-2" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#contact" className="text-gray-600 hover:text-primary px-2 py-2" onClick={() => setMobileMenuOpen(false)}>Contact</a>
              <Button onClick={() => { onCreateClick(); setMobileMenuOpen(false); }} variant={showCreateForm ? "outline" : "default"} className="w-full mt-2">
                {showCreateForm ? "View Blogs" : "Create New Blog"}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
