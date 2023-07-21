import Clock from '../Clock/Clock';

import Container from '@mui/material/Container';

const App = () => {
  return (
    <div className='App'>
      <div className="background" />
        <Container>
          <Clock/>
        </Container>
    </div>
  );
};

export default App;
