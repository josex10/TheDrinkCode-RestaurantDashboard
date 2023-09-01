import PropTypes from 'prop-types';
import {Box} from '@mui/material';

interface IProps {
    children: JSX.Element;
    value: number;
    index: number;
}
export const CustomTabPanel = (props: IProps) => {
    const { children, value, index } = props;
    return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
        >
          {value === index && (
            <Box sx={{ p: 3 }}>
              <span>{children}</span>
            </Box>
          )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};