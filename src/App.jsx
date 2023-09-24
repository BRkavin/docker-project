import { Box, Container, Grid, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import InputAmout from './components/InputAmout'
import SelectCountry from './components/SelectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import { CurrencyContext } from './context/CurrencyContext'

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
  } = useContext(CurrencyContext);

  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];

  useEffect(() => {
    if(firstAmount) {
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey: import.meta.env.VITE_API_KEY,
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
        }
      })
        .then(response => setResultCurrency(response.data.data[codeToCurrency]))
        .catch(error => console.log(error))
    }
  }, [firstAmount, fromCurrency, toCurrency])

  // Updated styles using Material-UI's sx prop
  const containerStyles = {
    background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
    backgroundSize: "500% 500%",
    animation: "gradient 15s ease infinite",
    fontFamily: "Arial, sans-serif",
    color: "#fff",
    textAlign: "center",
    padding: "8rem",
    margin: 4,
  };

  const headerStyles = {
    fontSize: "2.5rem",
    marginBottom: "3rem",
  };

  const paragraphStyles = {
    fontSize: "1.2rem",
    marginBottom: "1.5rem",
  };

  return (
    <Container maxWidth="md" sx={containerStyles}>
      <Typography variant='h5' sx={headerStyles}>
        Quick and Fast Conversion
      </Typography>
      <Grid container spacing={3}>
        <InputAmout />
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
        <SwitchCurrency />
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
      </Grid>

      {firstAmount ? (
        <Box sx={{ textAlign: "center", marginTop: "1rem" }}>
          <Typography>
            {firstAmount} {fromCurrency} =
          </Typography>    
          <Typography variant='h3' sx={{ marginTop: "8px", fontWeight: "bold" }}>
            {resultCurrency * firstAmount} {toCurrency}
          </Typography>
        </Box>
      ) : ""}
    </Container>
  )
}

export default App
