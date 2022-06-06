import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import styled, { ThemeProvider } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`
export const Section = styled.section`
  width: 100%;
  padding: 1em;
  max-width: 768px;
  margin: 0 auto;
`

export const FullWidthSection = styled(Section)`
  margin: 0 -1em;
`

const theme = {
  primary: 'papayawhip',
  breakpoints: {
    xs: '320px',
    sm: '768px',
    md: '1024px'
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  )
}

export default App
