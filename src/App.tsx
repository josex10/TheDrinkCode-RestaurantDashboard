import { BrowserRouter } from "react-router-dom"
import { AppTheme } from "./theme/AppTheme";
import { AppRouter } from "./router/AppRouter";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';

function App() {
  return (
    <>
    <BrowserRouter>
      <AppTheme>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppRouter/>
        </LocalizationProvider>
      </AppTheme>
    </BrowserRouter>
    </>
  )
}

export default App
