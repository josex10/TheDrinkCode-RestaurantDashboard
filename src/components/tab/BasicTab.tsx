import { useState, SyntheticEvent } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { CustomTabPanel } from ".";
import { ITabsInfo } from '../models/ITabsInfo';


function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface IProps {
    tabsInfo: ITabsInfo[]
}

export const BasicTab = (props: IProps) => {
    const {tabsInfo}= props;
    const [value, setValue] = useState(0);
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setValue(newValue);
      };
    return (
        
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                {
                    tabsInfo.map( (tab, index) => {
                        return (
                            <Tab label={tab.label} {...a11yProps(tab.propValue)} key={`${index} - ${tab.label}`} />
                        )
                    })
                }
                </Tabs>
            </Box>
            {
                tabsInfo.map( tab => {
                return (
                    <CustomTabPanel value={value} index={tab.propValue} key={tab.label}>
                        {tab.view}
                    </CustomTabPanel>
                )
                })
            }
        </>
    )
}
