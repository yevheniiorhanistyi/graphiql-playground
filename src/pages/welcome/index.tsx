import { FC } from 'react';
import cn from 'classnames';

const Welcome: FC = () => {
  return (
    <div>
      <div className={cn('wrapper')}>
        <h1>Welcome to GraphiQL Playground!</h1>
      </div>
    </div>
  );
};

export default Welcome;
