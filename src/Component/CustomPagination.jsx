import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function CustomPagination({ count, page, onChange }) {
  const pageCount = Math.ceil(count / 5); // Assuming 5 rows per page, adjust as needed

  const handlePageChange = (event, newPage) => {
    onChange(newPage);
  };

  return (
    <Stack spacing={2}>
      {Array.from(Array(pageCount).keys()).map((index) => (
        <Pagination
          key={index}
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      ))}
    </Stack>
  );
}
