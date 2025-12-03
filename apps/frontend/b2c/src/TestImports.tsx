import { Button } from '@packages/shared-frontend';
import { formatDate, capitalize } from '@packages/shared-utils';

// Test file to verify frontend clean imports
function TestImports() {
  const date = new Date();
  
  return (
    <div>
      <h1>Testing Clean Imports</h1>
      <p>Today is: {formatDate(date)}</p>
      <p>Capitalized: {capitalize('hello world')}</p>
      <Button onClick={() => console.log('Clean imports working!')}>
        Test Button
      </Button>
    </div>
  );
}

export default TestImports;