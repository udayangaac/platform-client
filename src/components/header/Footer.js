import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

export default function MenuAppBar() {
    return (
        <Box mt={8}>
            <Typography
                variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="http://www.classifidea.com">
                    Classifidea
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    )
}
