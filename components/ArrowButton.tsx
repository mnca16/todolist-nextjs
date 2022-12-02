import React from 'react'
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Box } from '@mui/material';

const ArrowButton = () => {
 return (
    <Box>
      <Link
         href={{
             pathname: `/`,
            }}>
            <Button variant="contained" color="secondary">
                <ArrowBackIcon/>
            </Button>
        </Link>
    </Box>
)}

export default ArrowButton