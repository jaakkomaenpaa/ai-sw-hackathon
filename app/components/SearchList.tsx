import { useState } from "react";
import { Box, List, ListItem, styled, TextField } from "@mui/material";
import { useSelection, useSelectionActions } from "~/stores/SelectionStore";
import { useLocale } from "~/stores/LocaleStore";

const SearchField = styled(TextField)(() => ({
  backgroundColor: "background.paper", // Matches the list container background
  borderRadius: "0.5rem", // Rounded corners
  marginBottom: "1rem", // Space below the search field
  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)", // Subtle shadow
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.5rem", // Rounded corners for the input field
    "& fieldset": {
      borderColor: "grey[300]", // Light gray border
    },
    "&:hover fieldset": {
      borderColor: "primary.main", // Highlight border on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "primary.main", // Highlight border on focus
      boxShadow: "0 0 0 4px rgba(46, 125, 50, 0.1)", // Glow effect
    },
  },
}));

const StyledListItem = styled(ListItem)(({ active }: { active: string }) => ({
  backgroundColor: active ? "lightgray" : "#FFFFFF", // White by default, highlight when active
  border: "1px solid #E0E0E0", // Subtle border
  borderRadius: "0.5rem", // Rounded corners
  boxShadow: active
    ? "0px 4px 6px rgba(0, 0, 0, 0.1)" // Stronger shadow for active items
    : "0px 2px 4px rgba(0, 0, 0, 0.05)", // Light shadow for inactive items
  padding: "0.75rem 1rem", // Inner padding
  marginBottom: "0.5rem", // Spacing between items
  cursor: "pointer", // Pointer cursor for interactivity
  transition: "transform 0.2s, box-shadow 0.2s", // Smooth hover/active effects
  "&:hover": {
    transform: "translateY(-2px)", // Slight lift on hover
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Enhance shadow on hover
  },
}));

const StyledList = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper, // Use theme's background color
  borderRadius: "0.5rem", // Rounded corners
  padding: "0.5rem", // Inner padding
  border: "1px solid #cccaca", // Subtle border
  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)", // Very subtle shadow
  overflowY: "auto", // Allow scrolling if content overflows
}));

function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const { translations } = useLocale();

  return (
    <SearchField
      sx={{ borderRadius: "0.5rem", backgroundColor: "background.paper" }}
      placeholder={translations.search}
      variant="outlined"
      size="small"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export const SearchableList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { translations } = useLocale();

  const items = Object.values(translations.listItems);

  const selection = useSelection();
  const { updateItems } = useSelectionActions();

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        backgroundColor: "background.paper",
      }}
    >
      {/* Search Field */}
      <SearchBar onSearch={setSearchQuery} />

      {/* List */}
      <StyledList sx={{ borderRadius: "0.5rem" }}>
        {filteredItems.map((item, index) => (
          <StyledListItem
            onClick={() => {
              if (selection.includes(item)) {
                updateItems(
                  selection.filter((selectedItem) => selectedItem !== item)
                );
                return;
              }
              updateItems([...selection, item]);
            }}
            key={index}
            active={selection.includes(item) ? item : ""}
          >
            {item}
          </StyledListItem>
        ))}
      </StyledList>
    </Box>
  );
};
