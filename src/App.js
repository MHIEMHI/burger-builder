import React, { Component, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Posts from './containers/Posts/Posts';
import Blog from './containers/Blog/Blog';
const NewPost = React.lazy(() => import('./containers/Blog/NewPost/NewPost'));

class App extends Component
{
  state = {
    auth: true
  };

  render()
  {
    return (
      <BrowserRouter>
        <div className="App">
          <Blog />
          <Switch>
            {this.state.auth && <Route path="/new-post" render={() =>
              <Suspense fallback={<div>Loading...</div>}>
                <NewPost />
              </Suspense>
            } />}
            <Route path="/posts" component={Posts} />
            <Route render={() => <h1>Not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
