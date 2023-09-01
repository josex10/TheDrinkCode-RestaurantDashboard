import { MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";

import { useAuthStore } from "../hooks";
import { useEffect, useState } from "react";
import { BasicButtonGroup } from "./BasicButtonGroup";
import { ICustomSelect } from "../layout/models";
import { LANGUAGES } from "../commons/constants/language.contant";
import { useTranslation } from "react-i18next";



interface IRestaurant {
  restaurant_name: string;
  restaurant_id: number;
}

export const Navbar = ({ drawerWith = 240 }) => {
  const { auth, changeAuthSelectedRestaurant, changeAuthLanguage} = useAuthStore();
  const [RestaurantList, setRestaurantList] = useState<ICustomSelect[]>([]);
  const { i18n, t } = useTranslation();

  const onHandleButtonSelectGroup = (data: string) => {
    changeAuthSelectedRestaurant({restaurant_id: Number(data)});
  }

  const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang_code = e.target.value;
    changeAuthLanguage({language: lang_code});
    i18n.changeLanguage(lang_code);
  };

  useEffect(() => {
    if(auth.restaurants && auth.restaurants.length > 0){
      const tmpResturants: ICustomSelect[] = auth.restaurants.map( (restaurant: IRestaurant) => {
        const rest: ICustomSelect = {
          label: restaurant.restaurant_name, value: String(restaurant.restaurant_id)
        }
        return  rest
      });

      setRestaurantList(tmpResturants);
    }
  }, []);
  

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWith}px)` },
        height: { sm: '7vh'},
        ml: { sm: `${drawerWith}px` },
      }}
    >
      <Toolbar>
        <IconButton color="inherit" sx={{ mr: 2, display: { sm: "none" } }}>
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="subtitle2" noWrap component="div" sx={{ color: "primary.contrastText" }}>
            {auth.company_name} - {t("title")}
            </Typography>
          </Grid>

          <Grid item>
          <select defaultValue={auth.language} onChange={onChangeLang}>
            {LANGUAGES.map(({ code, label }) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
          </Grid>

          <Grid item >
            <Grid container>
              {
                RestaurantList.length > 0 
                  ?( <><BasicButtonGroup onHandleButtonSelectGroup={onHandleButtonSelectGroup} selectedValue={String(auth.selected_restaurant)} selectData={RestaurantList}></BasicButtonGroup></>) 
                 : (<></>)
              }
            </Grid>
          </Grid> 
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
