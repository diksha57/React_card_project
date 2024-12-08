import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
  Pagination,
} from "@mui/material";

const BusinessListing = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const businessesPerPage = 5;

  // Fetch businesses from the mock API
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        // const response = await axios.get("https://mockapi.example.com/businesses");
        const response = [
          { "id": 1, "name": "Tech Corp", "category": "IT", "contact": "123-456-7890" },
          { "id": 2, "name": "Health Hub", "category": "Healthcare", "contact": "987-654-3210" },
          { "id": 3, "name": "Green Grocers", "category": "Retail", "contact": "555-555-5555" }
        ];        
        setBusinesses(response);
        setFilteredBusinesses(response);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };
    fetchBusinesses();
  }, []);

  // Filter businesses based on the search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBusinesses(businesses);
    } else {
      const filtered = businesses.filter((business) =>
        business.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBusinesses(filtered);
    }
  }, [searchQuery, businesses]);

  // Calculate the businesses to display on the current page
  const startIndex = (currentPage - 1) * businessesPerPage;
  const currentBusinesses = filteredBusinesses.slice(
    startIndex,
    startIndex + businessesPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ p: 4 }}>
      <TextField
        label="Search Businesses"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
      />
      {currentBusinesses.map((business) => (
        <Card key={business.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{business.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              Category: {business.category}
            </Typography>
            <Typography variant="body2">Contact: {business.contact}</Typography>
            <Button
              variant="contained"
              size="small"
              sx={{ mt: 1 }}
              onClick={() => alert(`Details for ${business.name}`)}
            >
              View More Details
            </Button>
          </CardContent>
        </Card>
      ))}
      <Pagination
        count={Math.ceil(filteredBusinesses.length / businessesPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 3, display: "flex", justifyContent: "center" }}
      />
    </Box>
  );
};

export default BusinessListing;

