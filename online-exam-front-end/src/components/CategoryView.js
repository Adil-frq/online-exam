import { useState } from "react";

function CategoryDropdown() {
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubcategory, setOpenSubcategory] = useState(null);

  const categories = [
    {
      name: "Physics",
      color: "#d32f2f",
      subcategories: ["Mechanics", "Optics", "Thermodynamics"]
    },
    {
      name: "Chemistry",
      color: "#388e3c",
      subcategories: ["Organic", "Inorganic", "Physical"]
    },
    {
      name: "Biology",
      color: "#1976d2",
      subcategories: ["Botany", "Zoology", "Genetics"]
    },
    {
      name: "Math",
      color: "#f57c00",
      subcategories: ["Algebra", "Geometry", "Calculus"]
    },
    {
      name: "STET",
      color: "#7b1fa2",
      subcategories: [
        {
          name: "Year",
          items: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"]
        },
        {
          name: "Special",
          items: ["TRE", "Mock Test", "Syllabus"]
        }
      ]
    }
  ];

  const handleCategoryClick = (name) => {
    setOpenCategory(openCategory === name ? null : name);
    setOpenSubcategory(null); // reset subcategory when switching
  };

  const handleSubcategoryClick = (name) => {
    setOpenSubcategory(openSubcategory === name ? null : name);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📂 Choose a Category</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
        {categories.map((cat) => (
          <div key={cat.name}>
            <div
              onClick={() => handleCategoryClick(cat.name)}
              style={{
                padding: "15px",
                background: "#f0f0f0",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                color: cat.color,
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}
            >
              {cat.name}
            </div>

            {/* Subcategories */}
            {openCategory === cat.name && (
              <div style={{ marginLeft: "20px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {cat.name === "STET" ? (
                  cat.subcategories.map((group) => (
                    <div key={group.name}>
                      <div
                        onClick={() => handleSubcategoryClick(group.name)}
                        style={{
                          padding: "10px",
                          background: "#e1bee7",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          color: "#4a148c"
                        }}
                      >
                        {group.name}
                      </div>
                      {openSubcategory === group.name && (
                        <div style={{ marginLeft: "20px", marginTop: "5px", display: "flex", flexDirection: "column", gap: "5px" }}>
                          {group.items.map((item) => (
                            <div
                              key={item}
                              onClick={() => alert(`Selected STET ${item}`)}
                              style={{
                                padding: "8px",
                                background: "#f3e5f5",
                                borderRadius: "4px",
                                cursor: "pointer",
                                color: "#6a1b9a"
                              }}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  cat.subcategories.map((sub) => (
                    <div
                      key={sub}
                      onClick={() => alert(`Selected ${cat.name} > ${sub}`)}
                      style={{
                        padding: "10px",
                        background: "#e0f2f1",
                        borderRadius: "6px",
                        cursor: "pointer",
                        color: cat.color
                      }}
                    >
                      {sub}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryDropdown;