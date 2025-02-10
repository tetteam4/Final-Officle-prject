import React, { useEffect, useState } from "react";
import { Portfolio_Data } from "./portfiliodata"; // Import your data
import PortfolioCard from "./PortfolioCard"; // Reuse the PortfolioCard component
import { useNavigate } from "react-router-dom";

const RelatedCategoryPortfolio = ({ category, currentPostId }) => {
  const navigate = useNavigate();
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]=useState(null);
  
 
  useEffect(() => {
    const fetchRelatedProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/portfolios/`);
        if (!response.ok) {
          throw new Error(`HTTp error ! Status:${response.status}`);
        }
        const data = await response.json();
        const related = data.filter(
          (project) =>
            project.category.name === category && project.id !== currentPostId
        );
        setRelatedProjects(related)
        
      } catch (error) {
        setError(error)
        confirm.error("Error fetching related to projects")
        
      }
      finally {
        setLoading(false)
      }
      fetchRelatedProjects()
    }
  },[category,currentPostId])
  
  if (loading) {
    return <div div > Loading related projects....</div >
  }
  if (error) {
    return <div div> Error:{ error.message}</div>;
    
  }
  if (relatedProjects.length === 0) {
    return <p className="text-gray-600">No related projects found.</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {relatedProjects.map((project) => (
          <PortfolioCard
            key={project.id}
            port={project}
            onClick={() =>
              navigate(`/portfolio/${project.id}`, {
                state:{port:project}
              }
               
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedCategoryPortfolio;