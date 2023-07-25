import Clock from '../Clock/Clock';
import Container from '@mui/material/Container';

const App = () => {
  return (
    <div className='App'>
      <div className="background" />
        <Container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
          <Clock/>
        </Container>
    </div>
  );
};

export default App;
