
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const BCHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');
  const isClient = location.pathname.startsWith('/client');

  return (
    <header className="bc-header text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-xl">BC</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold">Government of British Columbia</h1>
                <p className="text-blue-100 text-sm">Identity Services BC</p>
              </div>
            </div>
          </div>
          
          <nav className="flex items-center space-x-4">
            {!isAdmin && !isClient && (
              <>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10"
                  onClick={() => navigate('/client')}
                >
                  Developer Portal
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10"
                  onClick={() => navigate('/admin')}
                >
                  Administration
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10"
                >
                  Support
                </Button>
              </>
            )}
            
            {isClient && (
              <>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10"
                  onClick={() => navigate('/client')}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary"
                  onClick={() => navigate('/admin')}
                >
                  Admin View
                </Button>
              </>
            )}
            
            {isAdmin && (
              <>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10"
                  onClick={() => navigate('/admin')}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary"
                  onClick={() => navigate('/client')}
                >
                  Developer View
                </Button>
              </>
            )}
            
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-primary font-medium text-sm">JD</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default BCHeader;
